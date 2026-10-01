import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { PixelRibbonsBackground } from "@/components/ui/pixel-ribbons-background"

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  )
}

const HeroSection = React.forwardRef(
  (
    {
      className,
      title = "Build products for everyone",
      subtitle = {
        regular: "Designing your projects faster with ",
        gradient: "the largest figma UI kit.",
      },
      description = "Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
      ctaText = "Browse courses",
      ctaHref = "#",
      bottomImage = {
        light: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
        dark: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop",
      },
      gridOptions,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative overflow-hidden", className)} ref={ref} {...props}>
        <PixelRibbonsBackground className="z-0" />
        <section className="relative max-w-full mx-auto z-[1]">
          <div className="max-w-screen-xl z-10 mx-auto px-4 py-28 gap-12 md:px-8">
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/30 bg-gradient-to-br from-rose-400/45 via-pink-500/40 to-orange-400/35 px-6 py-12 text-center shadow-[0_30px_80px_-20px_rgba(236,72,153,0.45)] backdrop-blur-2xl md:px-14 md:py-16 before:pointer-events-none before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-b before:from-white/25 before:to-transparent before:to-40%">
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-auto -translate-x-1/2 -translate-y-1/2 text-white opacity-15"
              >
                <path
                  fill="currentColor"
                  d="M50 0 C53 32 68 47 100 50 C68 53 53 68 50 100 C47 68 32 53 0 50 C32 47 47 32 50 0 Z"
                />
              </svg>
              <div className="relative space-y-5 leading-0 lg:leading-5 [text-shadow:0_1px_12px_rgba(120,20,60,0.25)]">
                <h1 className="text-sm text-white/90 group font-geist mx-auto px-5 py-2 bg-white/15 border-[1px] border-white/25 rounded-3xl w-fit">
                  {title}
                  <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
                </h1>
                <h2 className="text-4xl tracking-tighter font-geist text-white mx-auto md:text-6xl">
                  {subtitle.regular}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100">
                    {subtitle.gradient}
                  </span>
                </h2>
                <p className="max-w-2xl mx-auto text-white/85">
                  {description}
                </p>
                <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                  {/* Render custom children if provided, otherwise use default button */}
                  {children || (
                    <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                      <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 text-xs font-medium backdrop-blur-3xl">
                        <a
                          href={ctaHref}
                          className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent dark:from-zinc-300/5 dark:via-purple-400/20 text-gray-900 dark:text-white border-input border-[1px] hover:bg-gradient-to-tr hover:from-zinc-300/30 hover:via-purple-400/40 hover:to-transparent dark:hover:from-zinc-300/10 dark:hover:via-purple-400/30 transition-all sm:w-auto py-4 px-10"
                        >
                          {ctaText}
                        </a>
                      </div>
                    </span>
                  )}
                </div>
              </div>
            </div>
            {bottomImage && (
              <div className="mt-32 relative z-10">
                <img
                  src={bottomImage.light}
                  className="w-full shadow-lg rounded-lg border border-gray-200 dark:hidden"
                  alt="Dashboard preview"
                />
                <img
                  src={bottomImage.dark}
                  className="hidden w-full shadow-lg rounded-lg border border-gray-800 dark:block"
                  alt="Dashboard preview"
                />
              </div>
            )}
          </div>
        </section>
      </div>
    )
  },
)
HeroSection.displayName = "HeroSection"

export { HeroSection } 