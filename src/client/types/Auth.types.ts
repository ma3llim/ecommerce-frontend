import type { User } from "@/types/User.types";

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface VerifyEmailRequest {
    userId: string;
    otp: string;
}

export interface ResendVerificationRequest {
    userId: string;
}

export interface ResetPasswordRequest {
    userId: string;
    otp: string;
    password: string;
}

export interface AuthenticationData {
    accessToken: string;
    user: User;
}
