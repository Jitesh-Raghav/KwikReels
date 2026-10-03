"use client";
import Link from "next/link";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

function Footer() {
  return (
    <footer className="mt-20 overflow-hidden border-t border-border bg-card px-4 pt-16 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center">
              <Logo size={34} />
            </Link>

            <p className="mt-5 text-muted-foreground">
              Built by{" "}
              <Link href="https://x.com/jiteshcodes" className="font-medium text-foreground underline-offset-4 hover:underline">
                @Jitesh
              </Link>
            </p>
            <div className="mt-2">
              <Link href="https://x.com/compose/tweet?text=I%27ve%20been%20using%20%23KwikReels%20to%20create%20amazing%20AI%20videos!%20Check%20it%20out%20%40jiteshcodes%20">
                <Button variant="secondary" className="h-10 rounded-full px-5 shadow-none">
                  Share Your Videos On
                  <Icons.twitter className="icon-class ml-1 w-3.5" />
                </Button>
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              © {new Date().getFullYear()} KwikReels. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4 font-geist-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Features</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/create-new-video" className="text-foreground/80 transition-colors hover:text-foreground">
                    Create Video
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-foreground/80 transition-colors hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="text-foreground/80 transition-colors hover:text-foreground">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/billing" className="text-foreground/80 transition-colors hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-geist-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">AI Tools</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <span className="text-foreground/80">
                    Script Generator
                  </span>
                </li>
                <li>
                  <span className="text-foreground/80">
                    Voice Synthesis
                  </span>
                </li>
                <li>
                  <span className="text-foreground/80">
                    Image Generation
                  </span>
                </li>
                <li>
                  <span className="text-foreground/80">
                    Auto Captions
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-geist-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Platforms</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <span className="flex items-center gap-2 text-foreground/80">
                    <Icons.youtube className="w-4 h-4" />
                    YouTube Shorts
                  </span>
                </li>
                <li>
                  <span className="flex items-center gap-2 text-foreground/80">
                    <Icons.instagram className="w-4 h-4" />
                    Instagram Reels
                  </span>
                </li>
                <li>
                  <span className="text-foreground/80">
                    TikTok Videos
                  </span>
                </li>
                <li>
                  <span className="text-foreground/80">
                    Social Media
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-geist-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Connect</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="https://github.com/Jitesh-Raghav" className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground">
                    <Icons.gitHub className="w-4 h-4" />
                    GitHub
                  </Link>
                </li>
                {/* <li>
                  <Link href="https://www.linkedin.com/in/jiteshcodes" className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground">
                    <Icons.linkedin className="w-4 h-4" />
                    LinkedIn
                  </Link>
                </li> */}
                <li>
                  <Link href="https://x.com/okayjitesh" className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M20 4l-6.768 6.768" />
                    </svg>
                    X (Twitter)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 flex w-full items-end justify-center">
          <p
            aria-hidden="true"
            className="select-none bg-gradient-to-r from-[#5B47D6] via-[#9B8AFB] to-[#C9BFFF] bg-clip-text text-center font-pixel text-[clamp(3.5rem,17vw,16rem)] leading-[0.8] tracking-tight text-transparent"
          >
            KwikReels
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer }; 