import type { User } from "../../../types/User.types";

export interface Admin extends User {}

export interface AdminAuthState {
    admin: Admin | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    initialized: boolean;
}
