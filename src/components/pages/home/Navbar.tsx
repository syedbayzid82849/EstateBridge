"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navItems = [
    { title: "Home", href: "/" },
    { title: "Properties", href: "/properties" },
    { title: "About", href: "/about" },
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
                ? "bg-primary/95 backdrop-blur-md shadow-lg"
                : "bg-primary" // Using the deep green from our config
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="flex items-center gap-2">
                            {/* Simple House Icon matching the brand */}
                            <div className="w-8 h-8 bg-secondary rounded-sm flex items-center justify-center">
                                <span className="text-primary font-bold text-xl">EB</span>
                            </div>
                            <span className="text-xl lg:text-2xl font-bold tracking-tight text-white font-serif">
                                EstateBridge
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList className="space-x-8">
                            {navItems.map((item) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.href}
                                        className="text-[15px] font-medium text-white/90 hover:text-secondary transition-colors"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Desktop Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link href="/login">
                            <Button variant="ghost" className="text-white hover:text-secondary hover:bg-white/10">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button
                                className="bg-secondary text-primary font-bold hover:bg-secondary/90 border-none px-6"
                            >
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="ghost" size="icon" className="text-white">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-primary text-white border-white/10">
                            <div className="flex flex-col space-y-6 mt-10 px-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className="text-lg font-medium hover:text-secondary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                                <hr className="border-white/10" />
                                <Link href="/login" >
                                    <Button variant="ghost" className="text-white hover:text-secondary w-full">login</Button>
                                </Link>
                                <Link href="/register" >
                                    <Button className="bg-secondary text-primary w-full">Get Started</Button>
                                </Link>

                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}