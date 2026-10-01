import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ButtonCta } from "@/components/ui/button-shiny"
import { Card } from "@/components/ui/card"

const Benefit = ({ text, checked, inverted }) => {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <span
          className={cn(
            "grid size-5 place-content-center rounded-full",
            inverted ? "bg-white text-black" : "bg-foreground text-background"
          )}
        >
          <Check className="size-3" strokeWidth={3} />
        </span>
      ) : (
        <span
          className={cn(
            "grid size-5 place-content-center rounded-full",
            inverted ? "bg-white/10 text-white/40" : "bg-secondary text-muted-foreground"
          )}
        >
          <X className="size-3" strokeWidth={3} />
        </span>
      )}
      <span
        className={cn(
          "text-sm",
          inverted
            ? checked ? "text-white/90" : "text-white/40"
            : checked ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {text}
      </span>
    </div>
  )
}

export const PricingCard = ({
  tier,
  price,
  bestFor,
  CTA,
  benefits,
  className,
  isPopular = false,
}) => {
  return (
    <div className="relative">
      <Card
        className={cn(
          "relative flex h-full w-full flex-col overflow-hidden rounded-3xl p-7",
          isPopular
            ? "border-foreground bg-foreground text-white shadow-[0_40px_100px_-40px_rgba(255,46,126,0.6)]"
            : "border-border bg-card",
          className,
        )}
      >
        {isPopular && (
          <>
            {/* glow and pixel dots in the hero ribbon colours */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[140%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,46,126,0.55),rgba(232,60,240,0.3)_45%,rgba(255,122,61,0)_100%)] blur-2xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1.2px)] [background-size:10px_10px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          </>
        )}

        <div className="relative flex h-7 items-center justify-between">
          <span
            className={cn(
              "font-geist-mono text-xs uppercase tracking-[0.2em]",
              isPopular ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {tier}
          </span>
          {isPopular && (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black">
              Most popular
            </span>
          )}
        </div>

        <div
          className={cn(
            "relative mt-6 border-b pb-6",
            isPopular ? "border-white/15" : "border-border"
          )}
        >
          <span className="block font-pixel text-6xl leading-none tracking-tight">
            {price}
          </span>
          <span className={cn("mt-3 block text-sm", isPopular ? "text-white/70" : "text-muted-foreground")}>
            {bestFor}
          </span>
        </div>

        <div className="relative space-y-3.5 py-7">
          {benefits.map((benefit, index) => (
            <Benefit key={index} {...benefit} inverted={isPopular} />
          ))}
        </div>

        <div className="relative mt-auto">
          {isPopular ? (
            <ButtonCta label={CTA} className="w-full bg-white text-black hover:bg-white/90" />
          ) : (
            <Button variant="secondary" size="lg" className="h-12 w-full rounded-full shadow-none hover:bg-secondary/70">
              {CTA}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
