"use client";
import type { AdminSidebarProps } from "@/admin/types/AdminAuth.types";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import { BookOpenIcon, Settings2Icon, HomeIcon, LayoutDashboardIcon, ChartBarStacked, Package, Tags } from "lucide-react";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Manage Categories",
            url: "#",
            icon: <ChartBarStacked />,
            items: [
                {
                    title: "Add Category",
                    url: "/admin/categories/add-category",
                },
                {
                    title: "Category Listing",
                    url: "/admin/categories/category-listing",
                },
            ],
        },
        {
            title: "Manage Products",
            url: "#",
            icon: <Package />,
            items: [
                {
                    title: "Add Product",
                    url: "/admin/products/add-product",
                },
                {
                    title: "Product Listing",
                    url: "/admin/products/product-listing",
                },
                {
                    title: "Manage Product Tags",
                    url: "/admin/products/product-tags",
                },
            ],
        },
        {
            title: "Manage Tags",
            url: "#",
            icon: <Tags />,
            items: [
                {
                    title: "Add Tag",
                    url: "/admin/tags/add-tag",
                },
                {
                    title: "Tag Listing",
                    url: "/admin/tags/tag-listing",
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
