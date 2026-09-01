import type { PageResponse } from "@/types/common/PageResponse.types";

export interface ContactListItem {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    createdAt: string;
}

export interface ContactDetails extends ContactListItem {
    message: string;
}

export type ContactListResponse = PageResponse<ContactListItem>;
