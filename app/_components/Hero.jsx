import React from 'react'
import { HeroSection } from '@/components/ui/hero-section-dark'
import { Button } from '@/components/ui/button'
import { ButtonCta } from '@/components/ui/button-shiny'
import { BrandsGrid } from '@/components/ui/brands'
import Authentication from './Authentication'
import { Features } from '@/components/ui/features'
import { CTASection } from '@/components/ui/cta-with-rectangle'
import { Footer } from '@/components/ui/large-name-footer'
import { PricingSection } from '@/components/ui/pricing-section'
import Link from 'next/link'

function Hero() {
  const socialPlatforms = [
    {
      name: "YouTube",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg"
    },
    {
      name: "Instagram",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg"
    },
    {
      name: "TikTok",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tiktok.svg"
    },
    {
      name: "Twitter",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg"
    },
    {
      name: "Facebook",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg"
    },
    {
      name: "Snapchat",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/snapchat.svg"
    },
    {
      name: "LinkedIn",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
    },
    {
      name: "Reddit",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/reddit.svg"
    },
    {
      name: "Pinterest",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pinterest.svg"
    },
    {
      name: "Telegram",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/telegram.svg"
    }
  ]

  return (
    <div>
      <HeroSection
        title="🤖 AI Video Generator"
        subtitle={{
          regular: "Create stunning ",
          gradient: "YouTube Shorts with AI"
        }}
        description="🤖 AI generates scripts, images, and voiceovers in seconds. ⚡Create, edit, and publish engaging shorts with ease!"
        bottomImage={{
          light: "/dashboard.png",
          dark: "/dashboard.png"
        }}
        gridOptions={{
          angle: 65,
          opacity: 0.3,
          cellSize: 50,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
        className="min-h-screen pt-20"
      >
        <div className="flex gap-4 flex-col sm:flex-row items-center">
          <Link href="/explore">
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto h-12 px-6 border-purple-500/30 bg-gradient-to-r from-purple-600/10 to-pink-500/10 hover:from-purple-600/20 hover:to-pink-500/20 text-purple-300 hover:text-purple-200 backdrop-blur-sm"
            >
              Explore
            </Button>
          </Link>
          <Authentication>
            <ButtonCta label="Get Started" />
          </Authentication>
        </div>
      </HeroSection>
      
      <BrandsGrid
        title="Share your AI-generated shorts across all platforms"
        brands={socialPlatforms}
        animate={true}
      />
      <Features />
      <PricingSection />
      <CTASection
        badge={{
          text: "Ready to get started?"
        }}
        title="Start Creating AI Videos Today"
        description="Join thousands of content creators who are already using our AI-powered platform to generate stunning YouTube Shorts effortlessly."
        action={{
          text: "Get Started Now",
          href: "/explore",
          variant: "default"
        }}
        withGlow={true}
        className="py-16"
      />
      <Footer />
    </div>
  )
}

export default Hero