import type { User } from "../../../types/User.types";

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
    admin: Admin;
};
