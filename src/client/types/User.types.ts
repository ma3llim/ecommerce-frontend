import type { User } from "@/types/User.types";

export type LoginRequest = {
    email: string;
    password: string;
};

export interface UserAuthState {
    user: User | null;
    accessToken: string | null;
}

export type LoginResponse = {
    accessToken: string;
    user: User;
};

export type NavUserProps = Pick<User, "email" | "firstName" | "lastName" | "role">;
