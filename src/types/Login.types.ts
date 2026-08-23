import type { User } from "./User.types";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse extends User {}
