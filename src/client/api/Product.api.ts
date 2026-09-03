import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { Product, ProductDetails, searchProduct } from "../types/Product.types";
import { axiosInstance } from "@/config/axios";
import { ENDPOINTS } from "./Api.endpoints";
import type { PageResponse } from "@/types/common/PageResponse.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";

export const ProductApi = {
    search: async (keyword: string): Promise<ApiResponse<PageResponse<searchProduct>>> => {
        const repsonse = await axiosInstance.get(ENDPOINTS.SEARCH(keyword));
        return repsonse.data;
    },
    getProducts: async ({ category, pagination }: { category?: string; pagination: PaginationRequest }): Promise<ApiResponse<PageResponse<Product>>> => {
        const response = await axiosInstance.get<ApiResponse<PageResponse<Product>>>(ENDPOINTS.PRODUCT.BASE, {
            params: { ...pagination, ...(category && { category }) },
            skipAuthRefresh: true,
        });
        return response.data;
    },
    getProductBySlug: async (productSlug: string): Promise<ApiResponse<ProductDetails>> => {
        const response = await axiosInstance.get<ApiResponse<ProductDetails>>(ENDPOINTS.PRODUCT.BY_SLUG(productSlug));
        return response.data;
    },
    getProductsByTag: async ({ tagSlug, pagination }: { tagSlug: string; pagination: PaginationRequest }): Promise<ApiResponse<PageResponse<Product>>> => {
        const response = await axiosInstance.get<ApiResponse<PageResponse<Product>>>(ENDPOINTS.PRODUCT.GET_BY_TAG(tagSlug), {
            params: pagination,
        });
        return response.data;
    },
};
