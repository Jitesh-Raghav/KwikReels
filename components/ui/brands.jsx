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
        className={cn("relative py-16 md:py-20", className)}
        {...props}
      >

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 lg:px-8">
          {title && (
            <p className="mx-auto mb-10 flex max-w-2xl items-center justify-center gap-2 text-pretty text-center font-geist-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="size-1.5 rounded-[1px] bg-brand" />
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
                <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
              </>
            )}
            
            <div className={cn(
              "flex w-max items-center",
              animate && "animate-scroll-x"
            )}>
              {/* Render brands twice for seamless loop when animating */}
              {(animate ? [...brands, ...brands] : brands).map((brand, index) => (
                <div 
                  key={`${brand.name}-${index}`} 
                  className="group flex flex-shrink-0 items-center justify-center pr-4 md:pr-6"
                >
                  <div className="flex items-center gap-3 rounded-full border border-border bg-card py-2 pl-2 pr-5 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md">
                    <span className="relative grid size-9 place-items-center rounded-full bg-secondary">
                      <Image
                        src={brand.logo}
                        alt=""
                        width={18}
                        height={18}
                        className="opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </span>
                    <span className="text-sm font-medium text-foreground">{brand.name}</span>
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