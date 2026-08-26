import { axiosInstance } from "@/config/axios";
import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { PageResponse } from "@/types/common/PageResponse.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import type { AddProductRequest, AddProductResponse, Product, ProductDetail, UpdateProductRequest, UpdateProductStatusRequest } from "../types/Product.types";
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

    deleteProduct: async (productId: string) => {
        const response = await axiosInstance.delete<ApiResponse<null>>(ADMIN_ENDPOINTS.PRODUCTS.DELETE(productId));
        return response.data;
    },

    getProductById: async (productId: string) => {
        const response = await axiosInstance.get<ApiResponse<ProductDetail>>(ADMIN_ENDPOINTS.PRODUCTS.GET_BY_ID(productId));

        return response.data;
    },

    updateProduct: async (productId: string, data: UpdateProductRequest) => {
        const response = await axiosInstance.put(ADMIN_ENDPOINTS.PRODUCTS.UPDATE_PRODUCT(productId), data);

        return response.data;
    },

    updateProductStatus: async (productId: string, data: UpdateProductStatusRequest) => {
        const response = await axiosInstance.patch(ADMIN_ENDPOINTS.PRODUCTS.UPDATE_PRODUCT_STATUS(productId), data);

        return response.data;
    },
};
