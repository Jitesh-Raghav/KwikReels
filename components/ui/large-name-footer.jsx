"use client";
import Link from "next/link";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <footer className="py-12 px-4 md:px-6 bg-background border-t border-purple-500/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Icons.video className="icon-class w-8 text-purple-500" />
              <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200 bg-clip-text text-transparent">
                KwikReels
              </h2>
            </Link>

            <h1 className="dark:text-gray-300 mt-4">
              Built by{" "}
              <span className="text-purple-500 dark:text-purple-400">
                <Link href="https://x.com/jiteshcodes">@Jitesh</Link>
              </span>
            </h1>
            <div className="mt-2">
              <Link href="https://x.com/compose/tweet?text=I%27ve%20been%20using%20%23KwikReels%20to%20create%20amazing%20AI%20videos!%20Check%20it%20out%20%40jiteshcodes%20">
                <Button variant="secondary" className="border-purple-500/30 bg-gradient-to-r from-purple-600/10 to-pink-500/10 hover:from-purple-600/20 hover:to-pink-500/20 text-purple-300 hover:text-purple-200">
                  Share Your Videos On
                  <Icons.twitter className="icon-class ml-1 w-3.5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm dark:text-gray-400 mt-5">
              © {new Date().getFullYear()} KwikReels. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-purple-500 dark:text-purple-400">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/create-new-video" className="text-gray-600 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400">
                    Create Video
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-600 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="text-gray-600 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/billing" className="text-gray-600 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-purple-500 dark:text-purple-400">AI Tools</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-600 dark:text-gray-400">
                    Script Generator
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 dark:text-gray-400">
                    Voice Synthesis
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 dark:text-gray-400">
                    Image Generation
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 dark:text-gray-400">
                    Auto Captions
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-purple-500 dark:text-purple-400">Platforms</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Icons.youtube className="w-4 h-4" />
                    YouTube Shorts
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Icons.instagram className="w-4 h-4" />
                    Instagram Reels
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 dark:text-gray-400">
                    TikTok Videos
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 dark:text-gray-400">
                    Social Media
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-purple-500 dark:text-purple-400">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="https://github.com/Jitesh-Raghav" className="text-gray-600 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 flex items-center gap-2">
                    <Icons.gitHub className="w-4 h-4" />
                    GitHub
                  </Link>
                </li>
                {/* <li>
                  <Link href="https://www.linkedin.com/in/jiteshcodes" className="text-gray-600 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 flex items-center gap-2">
                    <Icons.linkedin className="w-4 h-4" />
                    LinkedIn
                  </Link>
                </li> */}
                <li>
                  <Link href="https://x.com/okayjitesh" className="text-gray-600 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 flex items-center gap-2">
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
        <div className="w-full flex mt-12 items-center justify-center px-4">
          <h1 className="text-center text-4xl sm:text-6xl md:text-8xl lg:text-[12rem] xl:text-[15rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-700/20 via-purple-500/30 to-purple-900/40 dark:from-purple-300/20 dark:via-purple-500/30 dark:to-purple-700/40 select-none tracking-wider">
            KwikReels
          </h1>
        </div>
      </div>
    </footer>
  );
}

export { Footer }; 