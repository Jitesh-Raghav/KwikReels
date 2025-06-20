import { PricingCard } from "@/components/ui/dark-gradient-pricing"

export function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-16">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/5 to-transparent dark:from-purple-950/10" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 md:text-lg max-w-2xl mx-auto">
            Start creating amazing AI-generated YouTube Shorts today. Choose the plan that fits your content creation needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          <PricingCard
            tier="Free"
            price="$0"
            bestFor="3 AI video credits"
            CTA="Get Started Free"
            benefits={[
              { text: "3 AI video generations", checked: true },
              { text: "Basic video styles", checked: true },
              { text: "Standard voice models", checked: true },
              { text: "720p video quality", checked: true },
              { text: "Community support", checked: true },
              { text: "Advanced AI features", checked: false },
              { text: "Priority processing", checked: false },
              { text: "Custom branding", checked: false },
            ]}
          />
          
          <PricingCard
            tier="Pro"
            price="$25"
            bestFor="30 AI video credits"
            CTA="Start Pro Trial"
            isPopular={true}
            benefits={[
              { text: "30 AI video generations", checked: true },
              { text: "All video styles", checked: true },
              { text: "Premium voice models", checked: true },
              { text: "1080p HD video quality", checked: true },
              { text: "Email support", checked: true },
              { text: "Advanced AI features", checked: true },
              { text: "Priority processing", checked: true },
              { text: "Custom branding", checked: false },
            ]}
          />
          
          <PricingCard
            tier="Pro Plus"
            price="$125"
            bestFor="150 AI video credits"
            CTA="Go Pro Plus"
            benefits={[
              { text: "150 AI video generations", checked: true },
              { text: "All premium styles", checked: true },
              { text: "Exclusive voice models", checked: true },
              { text: "4K video quality", checked: true },
              { text: "Priority support", checked: true },
              { text: "Advanced AI features", checked: true },
              { text: "Priority processing", checked: true },
              { text: "Custom branding", checked: true },
            ]}
          />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All plans include access to our AI script generator, voice synthesis, and automatic captions.
          </p>
        </div>
      </div>
    </section>
  )
} 