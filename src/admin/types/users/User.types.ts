export type AccountStatus = "PENDING" | "ACTIVE" | "LOCKED" | "DISABLED";

export type UserRole = "ADMIN" | "USER";

export type AddressType = "HOME" | "WORK" | "OTHER";

export interface UserListResponse {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    accountStatus: AccountStatus;
    role: UserRole;
    createdAt: string;
}

export interface UserAddressResponse {
    id: string;
    fullName: string;
    phoneNumber: string;
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    addressType: AddressType;
    defaultShipping: boolean;
    defaultBilling: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserDetailsResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    profileImageUrl?: string;
    accountStatus: AccountStatus;
    role: UserRole;
    lastLoginAt?: string;
    createdAt: string;
    updatedAt: string;
    addresses: UserAddressResponse[];
}

export interface UpdateUserStatusRequest {
    accountStatus: AccountStatus;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export interface UpdateUserRequest {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}
