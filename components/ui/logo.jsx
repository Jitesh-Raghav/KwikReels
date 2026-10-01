import Image from "next/image"
import { cn } from "@/lib/utils"

// The logo artwork is white, so it sits on a black tile in the light UI
function LogoMark({ size = 36, className }) {
    return (
        <span
            className={cn("grid shrink-0 place-items-center rounded-xl bg-foreground", className)}
            style={{ width: size, height: size }}
        >
            <Image src="/logo.svg" alt="" width={size} height={size} className="scale-110" />
        </span>
    )
}

function Logo({ size = 36, className, textClassName }) {
    return (
        <span className={cn("flex items-center gap-2.5", className)}>
            <LogoMark size={size} />
            <span className={cn("font-pixel text-2xl leading-none tracking-tight text-foreground", textClassName)}>
                KwikReels
            </span>
        </span>
    )
}

export { Logo, LogoMark }
