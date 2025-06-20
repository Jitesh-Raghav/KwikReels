"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const BrandsGrid = React.forwardRef(
  ({ 
    className,
    title = "Upload your shorts to all major platforms",
    brands,
    imageHeight = 56,
    animate = false,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative py-16 bg-gradient-to-b from-background to-background/80 border-t border-purple-500/20",
          className
        )}
        {...props}
      >
        {/* Background gradient overlay to match hero */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/10 to-transparent dark:from-purple-950/20" />
        
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 lg:px-8">
          {title && (
            <p className="max-w-2xl mx-auto text-pretty text-center font-medium mb-12 text-gray-600 dark:text-gray-300 md:text-lg">
              {title}
            </p>
          )}

          <div className={cn(
            "overflow-hidden relative",
            animate && "mask-gradient"
          )}>
            {/* Gradient masks for seamless animation edges */}
            {animate && (
              <>
                <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
              </>
            )}
            
            <div className={cn(
              "flex items-center justify-center gap-12 md:gap-16",
              animate && "animate-scroll-x"
            )}>
              {/* Render brands twice for seamless loop when animating */}
              {(animate ? [...brands, ...brands] : brands).map((brand, index) => (
                <div 
                  key={`${brand.name}-${index}`} 
                  className="flex items-center justify-center flex-shrink-0 group"
                >
                  <div className="relative h-[56px] w-[56px] md:h-[64px] md:w-[64px] p-3 rounded-xl bg-gradient-to-br from-purple-600/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-purple-600/20 group-hover:to-pink-500/20">
                    <Image
                      src={brand.logo}
                      alt={`Share to ${brand.name}`}
                      fill
                      className="object-contain filter brightness-0 invert-[0.7] group-hover:invert-[1] transition-all duration-300 p-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BrandsGrid.displayName = "BrandsGrid"; 