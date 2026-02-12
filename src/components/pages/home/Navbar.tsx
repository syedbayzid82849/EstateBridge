"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navItems = [
    { title: "Home", href: "/" },
    { title: "Properties", href: "/properties" },
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white backdrop-blur-sm shadow-sm border-b border-neutral-200/50"
                : "bg-white"
                }`}
        >
            <nav className=" mx-auto px-4 sm:px-6 lg:px-8 bg-amber-500">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 group"
                        aria-label="RealEstate Home"
                    >
                        <div className="relative">
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="transition-transform duration-300 group-hover:scale-110"
                            >
                                <path
                                    d="M20 4L4 14V36H16V26H24V36H36V14L20 4Z"
                                    fill="#1a1a1a"
                                    className="transition-colors duration-300 group-hover:fill-neutral-700"
                                />
                                <path
                                    d="M20 4L36 14V16L20 6L4 16V14L20 4Z"
                                    fill="#404040"
                                    className="transition-colors duration-300 group-hover:fill-neutral-500"
                                />
                            </svg>
                        </div>
                        <span className="text-xl lg:text-2xl font-bold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-neutral-700">
                            RealEstate
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList className="space-x-1">
                            {navItems.map((item) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.href}
                                        className="text-[15px] font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50/80 rounded-md transition-colors px-3 py-2"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Desktop Login Button */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Button variant="default" size="sm" className="bg-neutral-900 text-white hover:bg-neutral-800">
                            Login
                        </Button>
                        <Button
                        onClick={() => alert("Sign up functionality coming soon!")}
                         variant="default" size="sm" className="bg-neutral-900 text-white hover:bg-neutral-800">
                            Sign up
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative h-10 w-10 hover:bg-neutral-50"
                                aria-label="Toggle menu"
                            >
                                <Menu className="h-6 w-6 text-neutral-900" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-full sm:w-[400px] p-0 bg-white"
                        >
                            <div className="flex flex-col h-full">
                                {/* Mobile Header */}
                                <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
                                    <Link
                                        href="/"
                                        className="flex items-center space-x-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <svg
                                            width="32"
                                            height="32"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M20 4L4 14V36H16V26H24V36H36V14L20 4Z"
                                                fill="#1a1a1a"
                                            />
                                        </svg>
                                        <span className="text-lg font-bold text-neutral-900">
                                            RealEstate
                                        </span>
                                    </Link>
                                    <SheetClose asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 hover:bg-neutral-50"
                                        >
                                            <X className="h-5 w-5 text-neutral-700" />
                                        </Button>
                                    </SheetClose>
                                </div>

                                {/* Mobile Menu Items */}
                                <div className="flex-1 overflow-y-auto py-6">
                                    <nav className="flex flex-col space-y-1 px-4">
                                        {navItems.map((item) => (
                                            <div key={item.title} className="border-b border-neutral-100 last:border-0">
                                                <li className="py-2">
                                                    <Link
                                                        href={item.href}
                                                        className="text-[15px] font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50/80 rounded-md transition-colors px-3 py-2"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            </div>
                                        ))}
                                    </nav>
                                </div>

                                {/* Mobile Footer with Login */}
                                <div className="border-t border-neutral-200 p-6">
                                    <Button
                                        asChild
                                        className="w-full bg-neutral-900 text-white hover:bg-neutral-800 h-12 text-base font-medium"
                                    >
                                        <Link href="/login" onClick={() => setIsOpen(false)}>
                                            Login
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}