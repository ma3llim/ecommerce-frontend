import { axiosInstance } from "@/config/axios";
import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { PageResponse } from "@/types/common/PageResponse.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import type { AddProductRequest, AddProductResponse, Product } from "../types/Product.types";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";

export const ProductApi = {
    getAllProducts: async (params: PaginationRequest) => {
        const response = await axiosInstance.get<ApiResponse<PageResponse<Product>>>(ADMIN_ENDPOINTS.PRODUCTS.GET_ALL, { params });
        return response.data;
    },
    addProduct: async (data: AddProductRequest): Promise<AddProductResponse> => {
        const response = await axiosInstance.post<AddProductResponse>(ADMIN_ENDPOINTS.PRODUCTS.CREATE, data);

        return response.data;
    },
};
