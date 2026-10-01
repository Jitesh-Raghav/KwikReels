"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

function BentoGrid({ items, className }) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300",
                        "hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(20,10,40,0.35)] will-change-transform",
                        item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
                    )}
                >
                    {/* pixel dot grid that fades in from the corner */}
                    <div
                        className={cn(
                            "pixel-grid pointer-events-none absolute inset-0 transition-opacity duration-500 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]",
                            item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}
                    />

                    <div className="relative flex h-full flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div className="grid size-12 place-items-center rounded-2xl bg-secondary transition-colors duration-300 group-hover:bg-foreground group-hover:[&_svg]:text-background">
                                {item.icon}
                            </div>
                            {item.status && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 font-geist-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                    <span className="size-1.5 rounded-[1px] bg-brand" />
                                    {item.status}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-pixel text-2xl leading-tight tracking-tight text-foreground">
                                {item.title}
                                {item.meta && (
                                    <span className="ml-2 text-sm font-geist text-muted-foreground">
                                        {item.meta}
                                    </span>
                                )}
                            </h3>
                            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                                {item.description}
                            </p>
                        </div>

                        <div className="mt-auto flex items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-2">
                                {item.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="rounded-full bg-secondary px-2.5 py-1 font-geist-mono text-[11px] text-muted-foreground"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            {item.cta && (
                                <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                                    {item.cta.replace(/\s*→$/, "")}
                                    <ArrowUpRight className="size-4" />
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export { BentoGrid }
