"use client"

import * as React from "react"
import {
  ArrowLeft,
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Home,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "./ui/button"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },

  ],
  navMain: [
    {
      title: "Property Management",
      url: "#",
      icon: GalleryVerticalEnd,
      items: [
        {
          title: "All Properties",
          url: "/dashboard/properties",
        },
        {
          title: "Add Property",
          url: "/dashboard/add-property"
        },
        {
          title: "Pending Approval",
          url: "/dashboard/pending",
        },
        {
          title: "Sold / Rented",
          url: "/dashboard/completed",
        },
      ],
    },
    {
      title: "Booking Management",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "All Bookings",
          url: "/dashboard/bookings",
        },
        {
          title: "Cancelled Bookings",
          url: "/dashboard/cancelled",
        },
      ],
    },
    {
      title: "User Management",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "All Users",
          url: "/dashboard/users",
        },
        {
          title: "Add Admin",
          url: "/dashboard/add-admin",
        },
      ],
    },
    {
      title: "Reports & Revenue",
      url: "/dashboard/reports",
      icon: Settings2,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex items-center gap-2">
            {/* Simple House Icon matching the brand */}
            <div className="w-8 h-8 bg-secondary rounded-sm flex items-center justify-center">
              <span className="text-primary font-bold text-xl">EB</span>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Link className="flex justify-center" href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </Link>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
