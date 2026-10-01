"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const BASE_COLOR = "#EEEDF3"
const GRID_DOT_COLOR = "rgba(110, 110, 140, 0.16)"

// 4x4 Bayer matrix, normalised to 0..1, used to dither ribbon edges into scattered pixels
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(
  (v) => (v + 0.5) / 16,
)

// Each ribbon is a broad swoosh built from three stacked strokes (outer → core) that blur
// into each other. Coordinates are normalised to the canvas size.
const RIBBONS = [
  {
    from: [-0.25, 0.08], to: [1.25, 0.5], amp: 0.2, freq: 1.2, phase: 0, speed: 1,
    width: 0.36,
    layers: [
      ["#4F6BFF", "#8B5CF6", "#C13CF0"],
      ["#A855F7", "#E83CF0", "#FF3D8B"],
      ["#FF4D9E", "#FF2E5E", "#FF7A3D"],
    ],
  },
  {
    from: [-0.25, 0.9], to: [1.25, 0.32], amp: 0.16, freq: 1.5, phase: 2.1, speed: -0.8,
    width: 0.3,
    layers: [
      ["#C13CF0", "#FF4D5E", "#FF7A3D"],
      ["#E83CF0", "#FF2E7E", "#FF8A4C"],
      ["#FF6FB5", "#FF3D6E", "#FFB36B"],
    ],
  },
  {
    from: [0.15, -0.25], to: [0.95, 1.25], amp: 0.14, freq: 1.7, phase: 4.2, speed: 0.7,
    width: 0.22,
    layers: [
      ["#5B7CFF", "#A855F7", "#FF4D5E"],
      ["#C084FC", "#FF3D8B", "#FF6A3D"],
      ["#FF7AC2", "#FF2E7E", "#FF9A5C"],
    ],
  },
]

const LAYER_SCALE = [1, 0.66, 0.34]

function ribbonPath(ctx, ribbon, w, h, t) {
  const [x0, y0] = ribbon.from
  const [x1, y1] = ribbon.to
  const dx = x1 - x0
  const dy = y1 - y0
  const len = Math.hypot(dx, dy)
  // unit normal to the ribbon's main direction
  const nx = -dy / len
  const ny = dx / len
  const steps = 48

  ctx.beginPath()
  for (let i = 0; i <= steps; i++) {
    const s = i / steps
    const wave =
      Math.sin(s * Math.PI * ribbon.freq + ribbon.phase + t * ribbon.speed) * ribbon.amp +
      Math.sin(s * Math.PI * ribbon.freq * 0.5 + ribbon.phase * 1.7 - t * 0.6) * ribbon.amp * 0.35
    const x = (x0 + dx * s + nx * wave) * w
    const y = (y0 + dy * s + ny * wave) * h
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
}

function strokeGradient(ctx, ribbon, w, h, colors) {
  const g = ctx.createLinearGradient(
    ribbon.from[0] * w, ribbon.from[1] * h, ribbon.to[0] * w, ribbon.to[1] * h,
  )
  colors.forEach((c, i) => g.addColorStop(i / (colors.length - 1), c))
  return g
}

function makeCanvas(width, height) {
  const c = document.createElement("canvas")
  c.width = width
  c.height = height
  return c
}

// A single tile with a centred square, repeated to cut the ribbon blocks into separate pixels
function makeDotPattern(ctx, cell, ratio, color) {
  const tile = makeCanvas(cell, cell)
  const tctx = tile.getContext("2d")
  const size = Math.max(1, Math.round(cell * ratio))
  const off = Math.floor((cell - size) / 2)
  tctx.fillStyle = color
  tctx.fillRect(off, off, size, size)
  return ctx.createPattern(tile, "repeat")
}

function PixelRibbonsBackground({ className, cellSize = 7, fade = true }) {
  const containerRef = React.useRef(null)
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext("2d")
    // field: blurred ribbons, one pixel per mosaic cell
    const field = makeCanvas(1, 1)
    const fctx = field.getContext("2d", { willReadFrequently: true })
    // mask: field after dithering (alpha is 0 or 255)
    const mask = makeCanvas(1, 1)
    const mctx = mask.getContext("2d")
    // layer: mask scaled up to full resolution and cut into squares
    const layer = makeCanvas(1, 1)
    const lctx = layer.getContext("2d")
    if (!ctx || !fctx || !mctx || !lctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // All drawing happens in device pixels so the cell grid lines up exactly
    let width = 0
    let height = 0
    let cell = cellSize
    let narrow = false
    let cols = 0
    let rows = 0
    let ribbonPattern = null
    let gridPattern = null
    let frameId = 0
    let lastFrame = 0
    let visible = true

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.round(rect.width * dpr))
      height = Math.max(1, Math.round(rect.height * dpr))
      canvas.width = width
      canvas.height = height
      layer.width = width
      layer.height = height

      narrow = rect.width < 640
      const cssCell = narrow ? Math.max(5, cellSize - 2) : cellSize
      cell = Math.max(2, Math.round(cssCell * dpr))
      cols = Math.ceil(width / cell)
      rows = Math.ceil(height / cell)
      field.width = mask.width = cols
      field.height = mask.height = rows

      ribbonPattern = makeDotPattern(lctx, cell, 0.84, "#000")
      gridPattern = makeDotPattern(ctx, cell, 0.3, GRID_DOT_COLOR)
    }

    const draw = (time) => {
      const t = time * 0.00018

      // 1. Blurred ribbon field
      fctx.clearRect(0, 0, cols, rows)
      fctx.save()
      fctx.filter = `blur(${Math.max(1.5, cols / 90)}px)`
      fctx.lineCap = "round"
      fctx.lineJoin = "round"
      // narrow screens get relatively wider ribbons so they still read as broad swirls
      const unit = Math.max(Math.min(cols, rows) * (narrow ? 1.8 : 1), Math.sqrt(cols * rows) * 0.6)
      for (const ribbon of RIBBONS) {
        ribbonPath(fctx, ribbon, cols, rows, t)
        ribbon.layers.forEach((colors, i) => {
          fctx.strokeStyle = strokeGradient(fctx, ribbon, cols, rows, colors)
          fctx.lineWidth = ribbon.width * unit * LAYER_SCALE[i]
          fctx.stroke()
        })
      }
      fctx.restore()

      // 2. Ordered dither: soft edges become scattered pixels
      const image = fctx.getImageData(0, 0, cols, rows)
      const data = image.data
      for (let y = 0; y < rows; y++) {
        const row = (y & 3) * 4
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4 + 3
          data[i] = data[i] > BAYER[row + (x & 3)] * 230 ? 255 : 0
        }
      }
      mctx.putImageData(image, 0, 0)

      // 3. Scale the dithered field up to hard-edged blocks, then cut it into squares
      lctx.globalCompositeOperation = "copy"
      lctx.imageSmoothingEnabled = false
      lctx.drawImage(mask, 0, 0, cols * cell, rows * cell)
      lctx.globalCompositeOperation = "destination-in"
      lctx.fillStyle = ribbonPattern
      lctx.fillRect(0, 0, width, height)

      // 4. Compose: base, faint dot grid, soft glow, pixel ribbons
      ctx.fillStyle = BASE_COLOR
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = gridPattern
      ctx.fillRect(0, 0, width, height)
      ctx.save()
      ctx.globalAlpha = 0.45
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(field, 0, 0, cols * cell, rows * cell)
      ctx.restore()
      ctx.drawImage(layer, 0, 0)
    }

    const loop = (time) => {
      frameId = requestAnimationFrame(loop)
      if (time - lastFrame < 1000 / 30) return
      lastFrame = time
      draw(time)
    }

    const start = () => {
      if (reduceMotion || frameId || !visible || document.hidden) return
      frameId = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(frameId)
      frameId = 0
    }

    resize()
    draw(performance.now())

    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    intersectionObserver.observe(container)

    const onVisibilityChange = () => (document.hidden ? stop() : start())
    document.addEventListener("visibilitychange", onVisibilityChange)

    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [cellSize])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ backgroundColor: BASE_COLOR }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {fade && (
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-background" />
      )}
    </div>
  )
}

export { PixelRibbonsBackground }
