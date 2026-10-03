"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Lavender ramp: deep shadow -> mid lavender -> pale highlight
const DEEP = [0x2e, 0x1f, 0x8f]
const MID = [0x7c, 0x6a, 0xf2]
const PALE = [0xe2, 0xdc, 0xff]
const LEVELS = 18 // shade buckets, so each frame needs only a handful of fills

const MAJOR = 1 // ring radius
const MINOR = 0.56 // tube radius
const CAMERA = 4.2

// light from the upper left, towards the viewer
const LIGHT = (() => {
  const v = [-0.45, -0.6, 0.66]
  const l = Math.hypot(...v)
  return v.map((c) => c / l)
})()

function shade(t) {
  const [a, b, k] = t < 0.55 ? [DEEP, MID, t / 0.55] : [MID, PALE, (t - 0.55) / 0.45]
  return `rgb(${a.map((c, i) => Math.round(c + (b[i] - c) * k)).join(",")})`
}

/**
 * A ring ("reel") made of thousands of halftone dots. The tube ripples with
 * layered sine waves, slowly rotates, and leans towards the pointer.
 */
function ParticleShape({ className, density = 1, reflection = true }) {
  const containerRef = React.useRef(null)
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext("2d")
    const shapeCanvas = document.createElement("canvas")
    const sctx = shapeCanvas.getContext("2d")
    if (!ctx || !sctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fills = Array.from({ length: LEVELS }, (_, i) => shade(i / (LEVELS - 1)))

    let width = 0
    let height = 0
    let size = 0 // side of the square the shape is drawn in (device px)
    let dpr = 1
    let points = null // [u, v, jitter] per point
    let count = 0
    let buckets = []
    let frameId = 0
    let lastFrame = 0
    let visible = true
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

    const buildPoints = () => {
      const narrow = container.getBoundingClientRect().width < 520
      const target = Math.round((narrow ? 4200 : 9000) * density)
      const nv = Math.round(Math.sqrt(target / 2.6))
      const nu = Math.round(target / nv)
      count = nu * nv
      points = new Float32Array(count * 3)
      let k = 0
      for (let i = 0; i < nu; i++) {
        for (let j = 0; j < nv; j++) {
          // offset alternate rows so the dots form a halftone lattice
          points[k++] = ((i + (j % 2) * 0.5) / nu) * Math.PI * 2
          points[k++] = (j / nv) * Math.PI * 2
          points[k++] = Math.random()
        }
      }
      buckets = Array.from({ length: LEVELS }, () => [])
    }

    const resize = () => {
      const rect = container.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.round(rect.width * dpr))
      height = Math.max(1, Math.round(rect.height * dpr))
      canvas.width = width
      canvas.height = height
      size = Math.min(width, reflection ? height / 1.3 : height)
      // padded so ripples near the edge never get clipped
      shapeCanvas.width = shapeCanvas.height = Math.ceil(size * 1.3)
      buildPoints()
    }

    const drawShape = (time) => {
      const t = time * 0.00035
      pointer.x += (pointer.tx - pointer.x) * 0.05
      pointer.y += (pointer.ty - pointer.y) * 0.05

      // tilt the ring towards the viewer, spin it around its own axis
      const ax = 1.08 + Math.sin(t * 0.7) * 0.08 + pointer.y * 0.18
      const ay = -0.35 + Math.sin(t * 0.5) * 0.1 + pointer.x * 0.25
      const az = t * 0.35
      const [sx, cx] = [Math.sin(ax), Math.cos(ax)]
      const [sy, cy] = [Math.sin(ay), Math.cos(ay)]
      const [sz, cz] = [Math.sin(az), Math.cos(az)]

      const half = shapeCanvas.width / 2
      const scale = size * 0.92
      const dot = Math.max(1.4, size / 190)
      for (const b of buckets) b.length = 0

      for (let p = 0; p < count; p++) {
        const u = points[p * 3]
        const v = points[p * 3 + 1]
        const jitter = points[p * 3 + 2]

        // organic ripples on the tube
        const ripple =
          1 +
          0.2 * Math.sin(3 * u + t * 2.1) * Math.cos(2 * v - t * 1.4) +
          0.09 * Math.sin(5 * u - 3 * v + t * 2.7) +
          0.05 * Math.sin(9 * u + t * 3.3)
        const r = MINOR * ripple
        const cu = Math.cos(u)
        const su = Math.sin(u)
        const cv = Math.cos(v)
        const svv = Math.sin(v)

        let x = (MAJOR + r * cv) * cu
        let y = (MAJOR + r * cv) * su
        let z = r * svv
        let nx = cv * cu
        let ny = cv * su
        let nz = svv

        // rotate: Z (spin), then X (tilt), then Y (lean)
        let x1 = x * cz - y * sz
        let y1 = x * sz + y * cz
        let y2 = y1 * cx - z * sx
        let z2 = y1 * sx + z * cx
        x = x1 * cy + z2 * sy
        z = -x1 * sy + z2 * cy
        y = y2

        x1 = nx * cz - ny * sz
        y1 = nx * sz + ny * cz
        y2 = y1 * cx - nz * sx
        z2 = y1 * sx + nz * cx
        nx = x1 * cy + z2 * sy
        nz = -x1 * sy + z2 * cy
        ny = y2

        const persp = 1 / (CAMERA - z)
        const px = half + x * scale * persp * 1.62
        const py = half + y * scale * persp * 1.62

        // lambert light, softened so the far side still reads as dots
        const lambert = Math.max(0, nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2])
        const facing = nz > 0 ? 1 : 0.35
        const depth = (z + 1.5) / 3
        const level = Math.min(LEVELS - 1, Math.max(0, Math.floor((Math.pow(lambert, 1.5) * 0.8 + depth * 0.2) * facing * LEVELS + jitter * 1.5)))
        const s = dot * (0.55 + depth * 0.9) * (0.7 + lambert * 0.5)
        buckets[level].push(px - s / 2, py - s / 2, s)
      }

      sctx.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height)
      // darker (mostly farther / shadowed) dots first, highlights on top
      for (let l = 0; l < LEVELS; l++) {
        const b = buckets[l]
        if (!b.length) continue
        sctx.globalAlpha = 0.55 + (l / LEVELS) * 0.45
        sctx.fillStyle = fills[l]
        sctx.beginPath()
        for (let i = 0; i < b.length; i += 3) sctx.rect(b[i], b[i + 1], b[i + 2], b[i + 2])
        sctx.fill()
      }
      sctx.globalAlpha = 1
    }

    const draw = (time) => {
      drawShape(time)
      const pad = (shapeCanvas.width - size) / 2
      const left = (width - size) / 2 - pad
      const top = (reflection ? Math.max(0, (height - size * 1.3) / 2) : (height - size) / 2) - pad
      ctx.clearRect(0, 0, width, height)

      // soft lavender glow behind the shape
      const glow = ctx.createRadialGradient(width / 2, top + pad + size / 2, 0, width / 2, top + pad + size / 2, size * 0.62)
      glow.addColorStop(0, "rgba(155,138,251,0.38)")
      glow.addColorStop(0.6, "rgba(155,138,251,0.12)")
      glow.addColorStop(1, "rgba(155,138,251,0)")
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      if (reflection) {
        // floor glow and a faded mirror image, like a glossy floor
        const floorY = top + pad + size * 0.93
        ctx.save()
        ctx.translate(width / 2, floorY)
        ctx.scale(1, 0.12)
        const floor = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.48)
        floor.addColorStop(0, "rgba(120,100,240,0.35)")
        floor.addColorStop(1, "rgba(120,100,240,0)")
        ctx.fillStyle = floor
        ctx.beginPath()
        ctx.arc(0, 0, size * 0.48, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        ctx.save()
        ctx.globalAlpha = 0.22
        ctx.filter = `blur(${Math.round(4 * dpr)}px)`
        ctx.translate(left, floorY + size * 0.02)
        ctx.scale(1, -0.38)
        ctx.drawImage(shapeCanvas, 0, -size * 0.08)
        ctx.restore()
      }

      // blurred body underneath gives the dots volume, then the crisp dots
      ctx.save()
      ctx.globalAlpha = 0.85
      ctx.filter = `blur(${Math.round(size / 60)}px)`
      ctx.drawImage(shapeCanvas, left, top)
      ctx.restore()
      ctx.drawImage(shapeCanvas, left, top)
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

    const onPointerMove = (event) => {
      pointer.tx = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.ty = (event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })

    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [density, reflection])

  return (
    <div ref={containerRef} aria-hidden="true" className={cn("pointer-events-none relative", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}

export { ParticleShape }
