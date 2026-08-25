import { axiosInstance } from "@/config/axios";
import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { PageResponse } from "@/types/common/PageResponse.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";
import type { Category } from "../types/Category.types";

export const CategoryApi = {
    getAllCategoris: async (params: PaginationRequest = {}) => {
        const response = await axiosInstance.get<ApiResponse<PageResponse<Category[]>>>(ADMIN_ENDPOINTS.CATEGORY.GET_ALL, { params });
        return response.data;
    },
    addCategory: async (data: FormData) => {
        const response = await axiosInstance.post<ApiResponse<Category>>(ADMIN_ENDPOINTS.CATEGORY.CREATE, data);

        return response.data;
    },
};
