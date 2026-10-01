"use client"

import Link from "next/link"
import { ButtonCta } from "@/components/ui/button-shiny"
import { PixelRibbonsBackground } from "@/components/ui/pixel-ribbons-background"
import { cn } from "@/lib/utils"

export function CTASection({
  badge,
  title,
  description,
  action,
  className,
}) {
  return (
    <section className={cn("px-4 md:px-8", className)}>
      <div className="relative mx-auto flex max-w-screen-xl items-center justify-center overflow-hidden rounded-[2.5rem] px-4 py-20 md:py-28">
        <PixelRibbonsBackground fade={false} />

        <div className="relative z-10 flex max-w-2xl flex-col items-center gap-6 rounded-[2rem] border border-white/70 bg-white/[0.72] px-6 py-12 text-center shadow-[0_30px_80px_-30px_rgba(40,10,60,0.35)] backdrop-blur-2xl md:px-14">
          {badge && (
            <p className="flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-4 py-1.5 font-geist-mono text-[11px] uppercase tracking-[0.2em] text-foreground/70">
              <span className="size-1.5 rounded-[1px] bg-brand" />
              {badge.text}
            </p>
          )}

          <h2 className="font-pixel text-4xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            {title}
          </h2>

          {description && (
            <p className="max-w-xl text-foreground/[0.72]">
              {description}
            </p>
          )}

          <Link href={action.href}>
            <ButtonCta label={action.text} />
          </Link>
        </div>
      </div>
    </section>
  )
}
