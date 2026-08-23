import type { AccountStatus } from "./AccountStatus.types";
import type { UserRole } from "./UserRole.types";

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    accountStatus: AccountStatus;
    role: UserRole;
}
