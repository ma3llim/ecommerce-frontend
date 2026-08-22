export type UserRole = 'ADMIN' | 'USER';

export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    accountStatus: string;
    role: UserRole;
}

export interface AdminAuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}
