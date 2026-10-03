"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, MoveRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonCta } from "@/components/ui/button-shiny";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import Authentication from "@/app/_components/Authentication";
import { useAuthContext } from "@/app/provider";

const navigationItems = [
    { title: "Features", href: "/#features" },
    { title: "Pricing", href: "/#pricing" },
    { title: "Explore", href: "/explore" },
    { title: "Dashboard", href: "/dashboard" },
];

function Header1() {
    const { user } = useAuthContext();
    const [isOpen, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // transparent over the hero, frosted once the page scrolls
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed left-0 top-0 z-40 w-full px-4 transition-colors duration-300",
                scrolled || isOpen ? "bg-background/75 backdrop-blur-xl" : "bg-transparent"
            )}
        >
            <div className="container relative mx-auto flex min-h-[76px] items-center gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
                <Link href="/" className="flex items-center">
                    <Logo size={32} textClassName="text-[22px]" />
                </Link>

                <nav className="hidden items-center justify-center gap-1 lg:flex">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="rounded-full px-4 py-2 text-[15px] text-foreground/60 transition-colors hover:text-foreground"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="flex w-full items-center justify-end gap-2">
                    {!user ? (
                        <>
                            <Authentication>
                                <button
                                    type="button"
                                    className="hidden h-11 items-center rounded-full px-4 text-[15px] font-medium text-foreground transition-colors hover:bg-black/[0.04] md:inline-flex"
                                >
                                    Log in
                                </button>
                            </Authentication>
                            <Authentication>
                                <ButtonCta label="Get started" className="h-11 px-5 text-[15px]" />
                            </Authentication>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href={'/dashboard'}>
                                <ButtonCta label="Dashboard" className="h-11 px-5 text-[15px]" />
                            </Link>
                            {user?.pictureURL && (
                                <Image
                                    src={user.pictureURL}
                                    alt='User profile'
                                    width={40}
                                    height={40}
                                    className='rounded-full ring-2 ring-white'
                                />
                            )}
                        </div>
                    )}
                </div>

                <div className="flex shrink-0 justify-end lg:hidden">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={() => setOpen(!isOpen)} aria-label="Toggle menu">
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                {isOpen && (
                    <div className="absolute inset-x-0 top-[76px] flex flex-col gap-1 rounded-b-3xl bg-background/95 px-4 pb-6 pt-2 shadow-lg backdrop-blur-xl lg:hidden">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="flex items-center justify-between rounded-2xl px-3 py-3 text-lg hover:bg-black/[0.04]"
                                onClick={() => setOpen(false)}
                            >
                                {item.title}
                                <MoveRight className="h-4 w-4 stroke-1 text-muted-foreground" />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}

export { Header1 };
