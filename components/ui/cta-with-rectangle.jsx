"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function CTASection({
  badge,
  title,
  description,
  action,
  withGlow = true,
  className,
}) {
  return (
    <section className={cn("w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]", className)}>
      <div className="relative flex flex-col items-center gap-6 py-12 text-center sm:gap-8 md:py-24 bg-gradient-to-b from-background to-background/80 mx-4 sm:mx-8 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/5 to-transparent dark:from-purple-950/8" />
        
        <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
          {/* Badge */}
          {badge && (
            <Badge
              variant="outline"
              className="opacity-0 animate-fade-in-up delay-100 border-purple-500/30 bg-gradient-to-r from-purple-600/10 to-pink-500/10 text-purple-300 backdrop-blur-sm"
            >
              <span className="text-purple-300">{badge.text}</span>
            </Badge>
          )}

          {/* Title */}
          <h2 className="text-3xl font-semibold sm:text-5xl opacity-0 animate-fade-in-up delay-200 bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-purple-200 bg-clip-text text-transparent px-4">
            {title}
          </h2>

          {/* Description */}
          {description && (
            <p className="text-gray-600 dark:text-gray-300 opacity-0 animate-fade-in-up delay-300 max-w-2xl px-4">
              {description}
            </p>
          )}

          {/* Action Button */}
          <Button
            variant={action.variant || "default"}
            size="lg"
            className="opacity-0 border-2 text-white border-white animate-fade-in-up delay-500 border-purple-500/30 bg-transparent hover:bg-transparent text-purple-300 hover:text-purple-200 h-12 px-6"
            asChild
          >
            <a href={action.href}>{action.text}</a>
          </Button>
        </div>

        {/* Glow Effect */}
        {withGlow && (
          <div className="fade-top-lg pointer-events-none absolute inset-0 rounded-2xl bg-purple-900/50 shadow-[0_0_100px_40px_rgba(88,28,135,0.8)] opacity-0 animate-scale-in delay-700" />
        )}
      </div>
    </section>
  )
} 