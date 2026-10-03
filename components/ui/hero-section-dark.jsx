"use client"

import * as React from "react"
import { Captions, FileText, ImageIcon, Mic } from "lucide-react"
import { cn } from "@/lib/utils"
import { ParticleShape } from "@/components/ui/particle-shape"

const FEATURES = [
  { label: "AI Script", icon: FileText },
  { label: "Voiceover", icon: Mic },
  { label: "Image Generation", icon: ImageIcon },
  { label: "Auto Captions", icon: Captions },
]

// Vertical feature list with hairlines running in from the page edge
function FeatureRail() {
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % FEATURES.length), 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <ul className="flex flex-col gap-2">
      {FEATURES.map(({ label, icon: Icon }, i) => {
        const isActive = i === active
        return (
          <li key={label}>
            <button type="button" onClick={() => setActive(i)} className="group flex h-11 items-center">
              <span
                className={cn(
                  "h-px transition-all duration-500",
                  isActive ? "w-24 bg-foreground/70 xl:w-32" : "w-16 bg-foreground/15 xl:w-24"
                )}
              />
              <span
                className={cn(
                  "grid place-items-center overflow-hidden rounded-xl bg-foreground text-background transition-all duration-500",
                  isActive ? "size-10 opacity-100" : "size-0 opacity-0"
                )}
              >
                <Icon className="size-4" />
              </span>
              <span
                className={cn(
                  "ml-3 whitespace-nowrap text-sm transition-colors duration-300",
                  isActive ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground"
                )}
              >
                {label}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

// Hero laid out like a product poster: a dotted 3D ring in the middle,
// a feature rail on the left, headline bottom-left, copy and CTAs bottom-right
const HeroSection = React.forwardRef(
  (
    {
      className,
      subtitle = {
        regular: "Your Story. Any Style.",
        gradient: "Infinite Shorts.",
      },
      description,
      bottomImage,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative overflow-hidden", className)} ref={ref} {...props}>
        <section className="relative flex min-h-[100svh] flex-col pt-24 lg:pt-20">
          <div className="relative flex flex-1 items-center justify-center">
            <ParticleShape className="h-[400px] w-full max-w-[360px] sm:h-[500px] sm:max-w-[460px] lg:h-[560px] lg:max-w-[540px]" />

            <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block">
              <FeatureRail />
            </div>
          </div>

          <div className="relative mx-auto grid w-full max-w-screen-xl gap-8 px-6 pb-12 md:px-8 lg:grid-cols-12 lg:items-end lg:pb-14">
            <h1 className="font-pixel text-[2.4rem] leading-[1] tracking-tight text-foreground sm:text-6xl lg:col-span-7 xl:text-[4.25rem]">
              {subtitle.regular}
              <br />
              {subtitle.gradient}
            </h1>

            <div className="lg:col-span-5 lg:pb-2 lg:pl-8">
              {description && (
                <p className="max-w-md text-pretty text-[15px] leading-relaxed text-foreground/[0.68]">
                  {description}
                </p>
              )}
              {children && <div className="mt-6">{children}</div>}
            </div>
          </div>
        </section>

        {bottomImage && (
          <div className="relative mx-auto max-w-screen-xl px-6 pb-8 pt-10 md:px-8">
            <div className="rounded-[2rem] border border-border bg-card p-2 shadow-[0_40px_100px_-50px_rgba(60,40,140,0.45)]">
              <img src={bottomImage.light} className="w-full rounded-[1.6rem]" alt="Shorts created with KwikReels" />
            </div>
          </div>
        )}
      </div>
    )
  },
)
HeroSection.displayName = "HeroSection"

export { HeroSection }
