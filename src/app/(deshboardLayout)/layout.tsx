import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link";

export default function Page({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <header className="flex justify-between h-16 items-center gap-2 px-4 border-b">
                    <SidebarTrigger />
                    <span>
                        <Link href="/dashboard/overview">
                            <Button variant="outline" className="flex items-center gap-2">
                                Back to Overview
                            </Button>
                        </Link>
                    </span>
                </header>

                <main className="">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
