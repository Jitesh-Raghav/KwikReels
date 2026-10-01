"use client";

import { Button } from "@/components/ui/button";
import { ButtonCta } from "@/components/ui/button-shiny";
import { Logo } from "@/components/ui/logo";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Authentication from "@/app/_components/Authentication";
import { useAuthContext } from "@/app/provider";

function Header1() {
    const { user } = useAuthContext();
    
    const navigationItems = [
        {
            title: "Home",
            href: "/",
            description: "",
        },
        {
            title: "Features",
            description: "Explore our AI-powered video generation tools.",
            items: [
                {
                    title: "AI Script Generator",
                    href: "/features/script",
                },
                {
                    title: "Voice Synthesis",
                    href: "/features/voice",
                },
                {
                    title: "Video Styles",
                    href: "/features/styles",
                },
                {
                    title: "Export Options",
                    href: "/features/export",
                },
            ],
        },
        {
            title: "Resources",
            description: "Learn how to create amazing content.",
            items: [
                {
                    title: "Explore",
                    href: "/explore",
                },
                {
                    title: "Tutorials",
                    href: "/tutorials",
                },
                {
                    title: "Community",
                    href: "/community",
                },
                {
                    title: "Support",
                    href: "/support",
                },
            ],
        },
    ];

    const [isOpen, setOpen] = useState(false);
    
    return (
        <header className="fixed left-0 top-0 z-40 w-full border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl">
            <div className="container relative mx-auto flex min-h-[72px] flex-row items-center gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
                <Link href="/" className="flex items-center">
                    <Logo size={34} />
                </Link>

                <div className="hidden flex-row items-center justify-center lg:flex">
                    <NavigationMenu className="flex items-start justify-center">
                        <NavigationMenuList className="flex flex-row justify-center gap-1">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.href ? (
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={item.href}
                                                className="inline-flex h-9 items-center rounded-full px-4 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                                            >
                                                {item.title}
                                            </Link>
                                        </NavigationMenuLink>
                                    ) : (
                                        <>
                                            <NavigationMenuTrigger className="h-9 rounded-full bg-transparent px-4 text-sm font-normal text-muted-foreground hover:bg-secondary hover:text-foreground data-[state=open]:bg-secondary data-[state=open]:text-foreground">
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="!w-[450px] p-4">
                                                <div className="flex grid-cols-2 flex-col gap-4 lg:grid">
                                                    <div className="flex h-full flex-col justify-between">
                                                        <div className="flex flex-col gap-1">
                                                            <p className="font-pixel text-xl text-foreground">{item.title}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <Link href="/create-new-video">
                                                            <ButtonCta label="Try it now" className="mt-10 h-9 px-4 text-sm" />
                                                        </Link>
                                                    </div>
                                                    <div className="flex h-full flex-col justify-end text-sm">
                                                        {item.items?.map((subItem) => (
                                                            <NavigationMenuLink asChild key={subItem.title}>
                                                                <Link href={subItem.href} className="flex flex-row items-center justify-between rounded-xl px-4 py-2 hover:bg-secondary">
                                                                    <span>{subItem.title}</span>
                                                                    <MoveRight className="h-4 w-4 text-muted-foreground" />
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </div>
                                                </div>
                                            </NavigationMenuContent>
                                        </>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex w-full items-center justify-end gap-2">
                    <Link
                        href="/explore"
                        className="hidden h-10 items-center rounded-full px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary md:inline-flex"
                    >
                        Explore
                    </Link>

                    {!user ? (
                        <Authentication>
                            <ButtonCta label="Get Started" className="h-10 px-5 text-sm" />
                        </Authentication>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href={'/dashboard'}>
                                <ButtonCta label="Dashboard" className="h-10 px-5 text-sm" />
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

                <div className="flex w-12 shrink items-end justify-end lg:hidden">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full" onClick={() => setOpen(!isOpen)} aria-label="Toggle menu">
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                    {isOpen && (
                        <div className="container absolute right-0 top-[72px] flex w-full flex-col gap-8 rounded-b-3xl border-t bg-background/95 py-6 shadow-lg backdrop-blur-xl">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    <div className="flex flex-col gap-2">
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                className="flex items-center justify-between"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="text-lg">{item.title}</span>
                                                <MoveRight className="h-4 w-4 stroke-1 text-muted-foreground" />
                                            </Link>
                                        ) : (
                                            <p className="font-geist-mono text-xs uppercase tracking-widest text-muted-foreground">{item.title}</p>
                                        )}
                                        {item.items &&
                                            item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    className="flex items-center justify-between"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="text-lg">
                                                        {subItem.title}
                                                    </span>
                                                    <MoveRight className="h-4 w-4 stroke-1 text-muted-foreground" />
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export { Header1 }; 