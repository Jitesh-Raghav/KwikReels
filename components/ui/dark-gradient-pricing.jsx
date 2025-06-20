import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ButtonCta } from "@/components/ui/button-shiny"
import { Card } from "@/components/ui/card"

const Benefit = ({ text, checked }) => {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <span className="grid size-4 place-content-center rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-sm text-white">
          <Check className="size-3" />
        </span>
      ) : (
        <span className="grid size-4 place-content-center rounded-full dark:bg-zinc-800 bg-zinc-200 text-sm dark:text-zinc-400 text-zinc-600">
          <X className="size-3" />
        </span>
      )}
      <span className="text-sm dark:text-zinc-300 text-zinc-600">{text}</span>
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
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <Card
        className={cn(
          "relative h-full w-full overflow-hidden border",
          isPopular 
            ? "border-purple-500/50 bg-gradient-to-br from-purple-950/30 to-purple-900/50 dark:from-purple-950/50 dark:to-purple-900/80" 
            : "dark:border-zinc-700 dark:bg-gradient-to-br dark:from-zinc-950/50 dark:to-zinc-900/80 border-zinc-200 bg-gradient-to-br from-zinc-50/50 to-zinc-100/80",
          "p-6",
          className,
        )}
      >
        <div className="flex flex-col items-center border-b pb-6 dark:border-zinc-700 border-zinc-200">
          <span className={cn(
            "mb-6 inline-block text-lg font-semibold",
            isPopular ? "bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent" : "dark:text-zinc-50 text-zinc-900"
          )}>
            {tier}
          </span>
          <span className="mb-3 inline-block text-4xl font-bold">
            {price}
          </span>
          <span className="dark:bg-gradient-to-br dark:from-zinc-200 dark:to-zinc-500 bg-gradient-to-br from-zinc-700 to-zinc-900 bg-clip-text text-center text-transparent">
            {bestFor}
          </span>
        </div>
        <div className="space-y-4 py-9">
          {benefits.map((benefit, index) => (
            <Benefit key={index} {...benefit} />
          ))}
        </div>
        {isPopular ? (
          <ButtonCta label={CTA} className="w-full border border-gray-300" />
        ) : (
          <Button
            variant="outline"
            className="w-full h-12 border-purple-500/30 border border-gray-300 bg-gradient-to-r from-purple-600/10 to-pink-500/10 hover:from-purple-600/20 hover:to-pink-500/20 text-purple-300 hover:text-purple-200 backdrop-blur-sm"
          >
            {CTA}
          </Button>
        )}
      </Card>
    </div>
  )
} 