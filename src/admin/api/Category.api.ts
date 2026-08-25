import { axiosInstance } from "@/config/axios";
import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { PageResponse } from "@/types/common/PageResponse.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";
import type { Category } from "../types/Category.types";
import type { AddCategoryFormValues } from "@/validation/admin/categories/CategorySchema";

export const CategoryApi = {
    getAllCategoris: async (params: PaginationRequest = {}) => {
        const response = await axiosInstance.get<ApiResponse<PageResponse<Category>>>(ADMIN_ENDPOINTS.CATEGORY.GET_ALL, { params });
        return response.data;
    },
    addCategory: async (data: AddCategoryFormValues) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("categoryImage", data.categoryImage);
        formData.append("active", String(data.active));

        const response = await axiosInstance.post<ApiResponse<Category>>(ADMIN_ENDPOINTS.CATEGORY.CREATE, formData);

        return response.data;
    },
    updateCategory: async (categoryId: string, data: AddCategoryFormValues) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("categoryImage", data.categoryImage);
        formData.append("active", String(data.active));

        const response = await axiosInstance.put<ApiResponse<Category>>(ADMIN_ENDPOINTS.CATEGORY.UPDATE(categoryId), formData);

        return response.data;
    },

    deleteCategory: async (categoryId: string) => {
        const response = await axiosInstance.delete<ApiResponse<null>>(ADMIN_ENDPOINTS.CATEGORY.DELETE(categoryId));

        return response.data;
    },
};
