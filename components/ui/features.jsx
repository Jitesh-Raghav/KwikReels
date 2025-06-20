import { BentoGrid } from '@/components/ui/bento-grid'
import { Wand2, Mic, Palette, Clock, Sparkles, Video } from 'lucide-react'

export function Features() {
  const features = [
    {
      title: "AI Story Generation",
      description: "Generate engaging stories from any topic or custom prompt using advanced AI",
      icon: <Wand2 className="w-6 h-6 text-purple-600 dark:text-purple-400" strokeWidth={1.5} />,
      status: "Active",
      tags: ["AI", "Stories", "Automation"],
      cta: "Try Now →",
      colSpan: 2,
      hasPersistentHover: true
    },
    {
      title: "AI Voice Models",
      description: "Choose from multiple AI voice models for perfect narration",
      icon: <Mic className="w-6 h-6 text-purple-600 dark:text-purple-400" strokeWidth={1.5} />,
      status: "Live",
      tags: ["Voice", "AI"],
      cta: "Explore →"
    },
    {
      title: "Video Styles",
      description: "Select from various visual styles: cinematic, cartoon, realistic, and more",
      icon: <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" strokeWidth={1.5} />,
      tags: ["Styles", "Visual"],
      cta: "Browse →",
      colSpan: 2
    },
    {
      title: "Custom Duration",
      description: "Set the perfect length for your content - from quick 15-second clips to longer stories",
      icon: <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" strokeWidth={1.5} />,
      status: "Updated",
      tags: ["Duration", "Custom"],
      cta: "Configure →"
    }
  ]

  return (
    <section className="relative py-16 bg-gradient-to-b from-background to-background/80">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/10 to-transparent dark:from-purple-950/20" />
      
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200 bg-clip-text text-transparent mb-4">
            Powerful AI Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to create stunning YouTube Shorts with the power of artificial intelligence
          </p>
        </div>

        <BentoGrid items={features} />
      </div>
    </section>
  )
} 