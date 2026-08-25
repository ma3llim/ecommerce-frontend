import type React from "react";
import { Sidebar } from "@/components/ui/sidebar";
import type { User } from "@/types/User.types";

export type LoginRequest = {
    email: string;
    password: string;
};

export interface Admin extends User {}

export interface AdminAuthState {
    admin: Admin | null;
    accessToken: string | null;
}

export type LoginResponse = {
    accessToken: string;
    user: Admin;
};

export interface AdminSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: Admin;
}

export type NavUserProps = Pick<Admin, "email" | "firstName" | "lastName" | "role">;
