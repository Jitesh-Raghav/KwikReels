import { cn } from "@/lib/utils"

// Eyebrow label + pixel-font title + description, shared by the landing sections
function SectionEyebrow({ children, className }) {
    return (
        <p className={cn("inline-flex items-center gap-2 font-geist-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground", className)}>
            <span className="size-1.5 rounded-[1px] bg-brand" />
            {children}
        </p>
    )
}

function SectionHeading({ eyebrow, title, description, align = "center", className }) {
    return (
        <div className={cn("flex flex-col gap-4", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
            {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
            <h2 className="max-w-3xl text-balance font-pixel text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
                {title}
            </h2>
            {description && (
                <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                    {description}
                </p>
            )}
        </div>
    )
}

export { SectionHeading, SectionEyebrow }
