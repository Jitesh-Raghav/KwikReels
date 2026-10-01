import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Primary call to action: a black pill with an arrow, matching the hero
function ButtonCta({ label = "Get Started", className, ...props }) {
    return (
        <Button
            className={cn(
                "group h-12 w-fit rounded-full px-6 text-[15px] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] hover:bg-primary/85",
                className
            )}
            {...props}
        >
            {label}
            <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Button>
    );
}

export { ButtonCta }
