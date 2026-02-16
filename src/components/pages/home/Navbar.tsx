"use client";

import * as React from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    
} from "@/components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/app/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const navItems = [
    { title: "Home", href: "/" },
    { title: "Properties", href: "/properties" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const { isAuthenticated, logout, loading, user } = useAuth();


    if (isAuthenticated) {
        console.log("User is authenticated:", isAuthenticated);
    } else {
        console.log("User is not authenticated");
    }

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
                        {loading ? (
                            // Loading skeleton
                            <div className="flex items-center gap-2">
                                <div className="w-20 h-10 bg-white/10 animate-pulse rounded-lg"></div>
                                <div className="w-24 h-10 bg-white/10 animate-pulse rounded-lg"></div>
                            </div>
                        ) : isAuthenticated ? (
                            // ✅ LOGGED IN - Show User Dropdown
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="text-white hover:text-secondary hover:bg-white/10 flex items-center gap-2"
                                    >
                                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                                            <span className="text-primary font-bold text-sm">
                                                {user?.username.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="font-medium">{user?.username}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium">{user?.username}</p>
                                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="cursor-pointer">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={logout}
                                        className="text-red-600 cursor-pointer"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            // ❌ NOT LOGGED IN - Show Login/Register
                            <>
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
                            </>
                        )}
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
                                {loading ? (
                                    // Loading skeleton
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-10 bg-white/10 animate-pulse rounded-lg"></div>
                                        <div className="w-24 h-10 bg-white/10 animate-pulse rounded-lg"></div>
                                    </div>  
                                ) : isAuthenticated ? (
                                    <>
                                        <Link href="/dashboard" className="text-lg font-medium hover:text-secondary" onClick={() => setIsOpen(false)}>
                                            Dashboard
                                        </Link>
                                        <Link href="/profile" className="text-lg font-medium hover:text-secondary" onClick={() => setIsOpen(false)}>
                                            Profile 
                                        </Link>
                                        <Button variant="outline" className="w-full mt-4 text-red-600 border-red-600" onClick={() => { logout(); setIsOpen(false); }}>
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>  
                                        <Link href="/login" className="text-lg font-medium hover:text-secondary" onClick={() => setIsOpen(false)}>
                                            Sign In
                                        </Link> 
                                        <Link href="/register" className="text-lg font-medium hover:text-secondary" onClick={() => setIsOpen(false)}>
                                            Get Started
                                        </Link>
                                    </>
                                )}  

                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}