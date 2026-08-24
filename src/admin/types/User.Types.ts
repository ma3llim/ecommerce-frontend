import type { AccountStatus } from "@/types/AccountStatus.types";
import type { UserRole } from "@/types/UserRole.types";

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImageUrl: string;
    accountStatus: AccountStatus;
    role: UserRole;
    provider: string;
    emailVerified: boolean;
    createdAt: string;
    lastLoginAt: string;
}
