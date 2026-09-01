import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import type { NewsletterSubscriberResponse } from "../types/Newsletter.types";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";
import { axiosInstance } from "@/config/axios";

export const NewsletterApi = {
    getSubscribers: async (pagination: PaginationRequest): Promise<ApiResponse<NewsletterSubscriberResponse>> => {
        const response = await axiosInstance.get<ApiResponse<NewsletterSubscriberResponse>>(ADMIN_ENDPOINTS.NEWSLETTER.GET_NEWSLETTERS, {
            params: pagination,
        });
        return response.data;
    },
};
