"use client";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import {
    GalleryVerticalEndIcon,
    AudioLinesIcon,
    TerminalIcon,
    TerminalSquareIcon,
    BotIcon,
    BookOpenIcon,
    Settings2Icon,
    HomeIcon,
    LayoutDashboardIcon,
    User,
} from "lucide-react";
import type { AdminSidebarProps } from "@/admin/auth/types/AdminAuth.types";

// This is sample data.
const data = {
    teams: [
        {
            name: "Profile",
            logo: <GalleryVerticalEndIcon />,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: <AudioLinesIcon />,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: <TerminalIcon />,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: <TerminalSquareIcon />,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: <BotIcon />,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: <BookOpenIcon />,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: <Settings2Icon />,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    quickLinks: [
        {
            name: "Main Site",
            url: "/",
            icon: <HomeIcon />,
            target: true,
        },
        {
            name: "Dashboard",
            url: "/admin/dashboard",
            icon: <LayoutDashboardIcon />,
            target: false,
        },
        {
            name: "Profile",
            url: "/admin/profile",
            icon: <User />,
            target: false,
        },
    ],
};

export function AppSidebar({ user, ...props }: AdminSidebarProps) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                <NavProjects projects={data.quickLinks} />
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser email={user.email} firstName={user.firstName} lastName={user.lastName} role={user.role} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
