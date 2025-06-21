"use client";

import { Button } from "@/components/ui/button";
import { ButtonCta } from "@/components/ui/button-shiny";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
        <header className="w-full z-40 fixed top-0 left-0 bg-background/80 backdrop-blur-md border-b border-border/50 px-4">
            <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.href ? (
                                        <>
                                            <NavigationMenuLink asChild>
                                                <Link href={item.href}>
                                                    <Button variant="ghost">{item.title}</Button>
                                                </Link>
                                            </NavigationMenuLink>
                                        </>
                                    ) : (
                                        <>
                                            <NavigationMenuTrigger className="font-medium text-sm">
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="!w-[450px] p-4">
                                                <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="flex flex-col">
                                                            <p className="text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200 bg-clip-text text-transparent">{item.title}</p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                                                                <ButtonCta label="Try it now" className="mt-10 h-9 px-4 text-sm" />
                                                    </div>
                                                    <div className="flex flex-col text-sm h-full justify-end">
                                                        {item.items?.map((subItem) => (
                                                            <NavigationMenuLink
                                                                asChild
                                                                key={subItem.title}
                                                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                                            >
                                                                <Link href={subItem.href} className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded">
                                                                    <span>{subItem.title}</span>
                                                                    <MoveRight className="w-4 h-4 text-muted-foreground" />
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
                
                <div className="flex lg:justify-center">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src={'/logo.svg'} alt='GenVid logo' width={40} height={40} className="" />
                        <h2 className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200 bg-clip-text text-transparent'>KwikReels</h2>
                    </Link>
                </div>
                
                <div className="flex justify-end w-full gap-4">
                    <ThemeToggle className="hidden md:inline-flex" />
                    <Link href="/explore">
                        <Button 
                            variant="ghost" 
                            className="hidden md:inline h-10 px-4 border border-purple-500/30 bg-gradient-to-r from-purple-600/10 to-pink-500/10 hover:from-purple-600/20 hover:to-pink-500/20 text-purple-300 hover:text-purple-200 backdrop-blur-sm"
                        >
                            Explore
                        </Button>
                    </Link>
                    <div className="border-r hidden md:inline"></div>
                    
                    {!user ? (
                        <Authentication>
                            <ButtonCta label="Get Started" className="h-10" />
                        </Authentication>
                    ) : (
                        <div className='flex items-center gap-3'>
                            <Link href={'/dashboard'}>
                                <ButtonCta label="Dashboard" className="h-10" />
                            </Link>
                            {user?.pictureURL && (
                                <Image 
                                    src={user.pictureURL} 
                                    alt='User profile' 
                                    width={40} 
                                    height={40}
                                    className='rounded-full'
                                />
                            )}
                        </div>
                    )}
                </div>
                
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background/95 backdrop-blur-md shadow-lg py-4 container gap-8">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    <div className="flex flex-col gap-2">
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                className="flex justify-between items-center"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="text-lg">{item.title}</span>
                                                <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                            </Link>
                                        ) : (
                                            <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200 bg-clip-text text-transparent">{item.title}</p>
                                        )}
                                        {item.items &&
                                            item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    className="flex justify-between items-center pl-4"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="text-muted-foreground">
                                                        {subItem.title}
                                                    </span>
                                                    <MoveRight className="w-4 h-4 stroke-1" />
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