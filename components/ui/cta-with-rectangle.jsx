"use client"

import Link from "next/link"
import { ButtonCta } from "@/components/ui/button-shiny"
import { ParticleShape } from "@/components/ui/particle-shape"
import { SectionEyebrow } from "@/components/ui/section-heading"
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
      <div className="relative mx-auto grid max-w-screen-xl items-center gap-4 overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-[#F1EEFF] via-card to-[#F4F2FF] px-6 py-14 md:grid-cols-2 md:px-14 md:py-16">
        <div className="pixel-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_75%_50%,black,transparent_65%)]" />

        <div className="relative z-10 flex flex-col items-start gap-6">
          {badge && <SectionEyebrow>{badge.text}</SectionEyebrow>}

          <h2 className="font-pixel text-4xl leading-[1.02] tracking-tight text-foreground sm:text-6xl">
            {title}
          </h2>

          {description && (
            <p className="max-w-md text-foreground/[0.68]">
              {description}
            </p>
          )}

          <Link href={action.href} className="mt-2">
            <ButtonCta label={action.text} />
          </Link>
        </div>

        <ParticleShape density={0.7} className="relative mx-auto h-[300px] w-full max-w-[340px] md:h-[400px] md:max-w-[440px]" />
      </div>
    </section>
  )
}
