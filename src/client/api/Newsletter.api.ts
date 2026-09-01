import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { SubscribeNewsletterRequest } from "../types/Newsletter.types";
import { axiosInstance } from "@/config/axios";
import { ENDPOINTS } from "./Api.endpoints";

export const NewsletterApi = {
    subscribe: async (request: SubscribeNewsletterRequest): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.post<ApiResponse<string>>(ENDPOINTS.NEWSLETTER, request);
        return response.data;
    },
};
