import { BentoGrid } from '@/components/ui/bento-grid'
import { Wand2, Mic, Palette, Clock } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'

export function Features() {
  const features = [
    {
      title: "AI Story Generation",
      description: "Generate engaging stories from any topic or custom prompt using advanced AI",
      icon: <Wand2 className="w-5 h-5 text-foreground" strokeWidth={1.75} />,
      status: "Active",
      tags: ["AI", "Stories", "Automation"],
      cta: "Try Now →",
      colSpan: 2,
      hasPersistentHover: true
    },
    {
      title: "AI Voice Models",
      description: "Choose from multiple AI voice models for perfect narration",
      icon: <Mic className="w-5 h-5 text-foreground" strokeWidth={1.75} />,
      status: "Live",
      tags: ["Voice", "AI"],
      cta: "Explore →"
    },
    {
      title: "Video Styles",
      description: "Select from various visual styles: cinematic, cartoon, realistic, and more",
      icon: <Palette className="w-5 h-5 text-foreground" strokeWidth={1.75} />,
      tags: ["Styles", "Visual"],
      cta: "Browse →",
      colSpan: 2
    },
    {
      title: "Custom Duration",
      description: "Set the perfect length for your content - from quick 15-second clips to longer stories",
      icon: <Clock className="w-5 h-5 text-foreground" strokeWidth={1.75} />,
      status: "Updated",
      tags: ["Duration", "Custom"],
      cta: "Configure →"
    }
  ]

  return (
    <section id="features" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Powerful AI Features"
          description="Everything you need to create stunning YouTube Shorts with the power of artificial intelligence"
          className="mb-14"
        />

        <BentoGrid items={features} />
      </div>
    </section>
  )
}
