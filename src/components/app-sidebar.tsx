"use client";
import type { AdminSidebarProps } from "@/admin/types/AdminAuth.types";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import { HomeIcon, LayoutDashboardIcon, ChartBarStacked, Package, Tags, Users, Truck, Ticket, ShoppingCart, CreditCard } from "lucide-react";

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
            title: "Manage Users",
            url: "#",
            icon: <Users />,
            items: [
                {
                    title: "User Listing",
                    url: "/admin/users/user-listing",
                },
            ],
        },
        {
            title: "Manage Shipment",
            url: "#",
            icon: <Truck />,
            items: [
                {
                    title: "Shipment Listing",
                    url: "/admin/shipments/listing",
                },
            ],
        },
        {
            title: "Manage Coupons",
            url: "#",
            icon: <Ticket />,
            items: [
                {
                    title: "Coupon Listing",
                    url: "/admin/coupons/listing",
                },
                {
                    title: "Add Coupon",
                    url: "/admin/coupons/add",
                },
            ],
        },
        {
            title: "Manage Orders",
            url: "#",
            icon: <ShoppingCart />,
            items: [
                {
                    title: "Order Listing",
                    url: "/admin/orders/order-listing",
                },
            ],
        },
        {
            title: "Manage Payments",
            icon: <CreditCard />,
            url: "#",
            items: [
                {
                    title: "Payment Listing",
                    url: "/admin/payments/payment-listing",
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
