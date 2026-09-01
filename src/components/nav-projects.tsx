"use client";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function NavProjects({
    projects,
}: {
    projects: {
        name: string;
        url: string;
        icon: React.ReactNode;
        target: boolean;
    }[];
}) {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
            <SidebarMenu>
                {projects.map(item => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton render={<Link to={item.url} target={item.target ? "_blank" : undefined} />}>
                            {item.icon}
                            <span>{item.name}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
