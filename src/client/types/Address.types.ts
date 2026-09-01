import type { AddressFormSchemaValues } from "../validation/Address.schema";

export type AddressType = "HOME" | "OFFICE" | "OTHER";

export interface Address {
    id: string;
    fullName: string;
    phoneNumber: string;
    addressLineOne: string;
    addressLineTwo: string;
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

export interface CreateAddressRequest {
    fullName: string;
    phoneNumber: string;
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    addressType: AddressType;
    defaultShipping: boolean;
    defaultBilling: boolean;
}

export interface UpdateAddressRequest {
    fullName: string;
    phoneNumber: string;
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    addressType: AddressType;
}

export interface AddressFormProps {
    address?: Address | null;
    isPending: boolean;
    onSubmit: (values: AddressFormSchemaValues) => void;
    onCancel: () => void;
}

export interface AddressCardProps {
    address: Address;
    isPending: boolean;
    onEdit: (address: Address) => void;
    onDelete: (address: Address) => void;
    onDefaultShipping: (address: Address) => void;
    onDefaultBilling: (address: Address) => void;
}
