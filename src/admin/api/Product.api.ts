import { axiosInstance } from "@/config/axios";
import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { PageResponse } from "@/types/common/PageResponse.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import type {
    AddProductRequest,
    AddProductResponse,
    Product,
    ProductDetail,
    ProductOptionResponse,
    UpdateProductRequest,
    UpdateProductStatusRequest,
} from "../types/products/Product.types";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";
import type { TagResponse } from "../types/products/Tag.types";

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
    assignTagToProduct: async (productId: string, tagId: string) => {
        const response = await axiosInstance.post(ADMIN_ENDPOINTS.PRODUCTS.ASSIGN_TAG_TO_PRODUCT(productId, tagId));
        return response.data;
    },
    removeTagFromProduct: async (productId: string, tagId: string) => {
        const response = await axiosInstance.delete(ADMIN_ENDPOINTS.PRODUCTS.REMOVE_TAG_TO_PRODUCT(productId, tagId));
        return response.data;
    },
    getProductOptions: async (params: PaginationRequest): Promise<ApiResponse<PageResponse<ProductOptionResponse>>> => {
        const response = await axiosInstance.get(ADMIN_ENDPOINTS.PRODUCTS.GET_OPTIONS, { params });
        return response.data;
    },
    getProductTagAssignments: async (params: PaginationRequest): Promise<ApiResponse<PageResponse<TagResponse>>> => {
        const response = await axiosInstance.get(ADMIN_ENDPOINTS.PRODUCTS.GET_PRODUCT_TAG, { params });
        return response.data;
    },
};
