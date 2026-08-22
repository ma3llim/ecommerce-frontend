export interface AdminUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    accountStatus: string;
    role: string;
}
