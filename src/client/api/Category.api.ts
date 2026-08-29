import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { PageResponse } from "@/types/common/PageResponse.types";
import type { Category } from "../types/Category.types";
import { axiosInstance } from "@/config/axios";
import { ENDPOINTS } from "./Api.endpoints";

export const CategoryApi = {
    getAll: async (page = 0, size = 10): Promise<ApiResponse<PageResponse<Category>>> => {
        const response = await axiosInstance.get(ENDPOINTS.CATEGORIES, {
            params: {
                page,
                size,
            },
        });

        return response.data;
    },
};
