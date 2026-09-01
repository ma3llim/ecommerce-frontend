import type { ContactFormData } from "../types/Contact.types";
import { ENDPOINTS } from "./Api.endpoints";
import { axiosInstance } from "@/config/axios";
import type { ApiResponse } from "@/types/common/ApiResponse.types";

export const addContact = async (data: ContactFormData): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post(ENDPOINTS.SEND_CONTACT, data);
    return response.data;
};
