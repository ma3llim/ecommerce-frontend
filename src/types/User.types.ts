import type { AccountStatus } from "./AccountStatus.types";
import type { UserRole } from "./UserRole.types";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    profileImageUrl: string | null;
    emailVerified: boolean;
    accountStatus: AccountStatus;
    role: UserRole;
    createdAt: string;
    lastLoginAt: string;
    updatedAt: string;
}
