import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import type { ContactDetails, ContactListResponse } from "../types/Contact.types";
import { axiosInstance } from "@/config/axios";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";

export const ContactApi = {
    getContacts: async (pagination: PaginationRequest): Promise<ApiResponse<ContactListResponse>> => {
        const response = await axiosInstance.get<ApiResponse<ContactListResponse>>(ADMIN_ENDPOINTS.CONTACT.GET_CONTACTS, {
            params: pagination,
        });
        return response.data;
    },
    getContactDetails: async (contactId: string): Promise<ApiResponse<ContactDetails>> => {
        const response = await axiosInstance.get<ApiResponse<ContactDetails>>(ADMIN_ENDPOINTS.CONTACT.CONTACT_DETAILS(contactId));
        return response.data;
    },
};
