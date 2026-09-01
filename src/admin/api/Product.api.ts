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
import type {
    CreateProductVariantRequest,
    ProductVariantImageResponse,
    ProductVariantResponse,
    UpdateProductVariantRequest,
    VariantStatus,
} from "../types/products/ProductVariant.types";
import type { CreateProductFaqRequest, ProductFaqResponse, UpdateProductFaqRequest, UpdateProductFaqStatusRequest } from "../types/products/ProductFaq.types";

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
    getProductVariants: async (productId: string): Promise<ApiResponse<ProductVariantResponse[]>> => {
        const response = await axiosInstance.get<ApiResponse<ProductVariantResponse[]>>(ADMIN_ENDPOINTS.PRODUCTS.GET_VARIANTS(productId));
        return response.data;
    },
    getProductVariant: async (productId: string, variantId: string): Promise<ApiResponse<ProductVariantResponse>> => {
        const response = await axiosInstance.get<ApiResponse<ProductVariantResponse>>(ADMIN_ENDPOINTS.PRODUCTS.GET_VARIANT(productId, variantId));
        return response.data;
    },
    createProductVariant: async (productId: string, data: CreateProductVariantRequest): Promise<ApiResponse<ProductVariantResponse>> => {
        const formData = new FormData();
        formData.append("price", String(data.price));
        formData.append("stockQuantity", String(data.stockQuantity));
        formData.append("attributes", JSON.stringify(data.attributes));
        data.images?.forEach(image => {
            formData.append("images", image);
        });

        const response = await axiosInstance.post<ApiResponse<ProductVariantResponse>>(ADMIN_ENDPOINTS.PRODUCTS.CREATE_VARIANT(productId), formData);
        return response.data;
    },
    updateProductVariant: async (productId: string, variantId: string, data: UpdateProductVariantRequest): Promise<ApiResponse<ProductVariantResponse>> => {
        const response = await axiosInstance.put<ApiResponse<ProductVariantResponse>>(ADMIN_ENDPOINTS.PRODUCTS.UPDATE_VARIANT(productId, variantId), data);
        return response.data;
    },
    deleteProductVariant: async (productId: string, variantId: string): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.delete<ApiResponse<string>>(ADMIN_ENDPOINTS.PRODUCTS.DELETE_VARIANT(productId, variantId));
        return response.data;
    },
    updateVariantStatus: async (productId: string, variantId: string, status: VariantStatus): Promise<ApiResponse<ProductVariantResponse>> => {
        const response = await axiosInstance.put<ApiResponse<ProductVariantResponse>>(ADMIN_ENDPOINTS.PRODUCTS.UPDATE_VARIANT_STATUS(productId, variantId), {
            status,
        });
        return response.data;
    },
    uploadVariantImages: async (productId: string, variantId: string, images: File[]): Promise<ApiResponse<ProductVariantImageResponse[]>> => {
        const formData = new FormData();

        images.forEach(image => {
            formData.append("images", image);
        });

        const response = await axiosInstance.post<ApiResponse<ProductVariantImageResponse[]>>(
            ADMIN_ENDPOINTS.PRODUCTS.UPLOAD_VARIANT_IMAGES(productId, variantId),
            formData
        );

        return response.data;
    },
    deleteVariantImage: async (productId: string, variantId: string, imageVariantId: string): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.delete<ApiResponse<string>>(ADMIN_ENDPOINTS.PRODUCTS.DELETE_VARIANT_IMAGE(productId, variantId, imageVariantId));
        return response.data;
    },
    replaceVariantImage: async (
        productId: string,
        variantId: string,
        variantImageId: string,
        image: File
    ): Promise<ApiResponse<ProductVariantImageResponse>> => {
        const formData = new FormData();
        formData.append("image", image);
        const response = await axiosInstance.put<ApiResponse<ProductVariantImageResponse>>(
            ADMIN_ENDPOINTS.PRODUCTS.REPLACE_VARIANT_IMAGE(productId, variantId, variantImageId),
            formData
        );

        return response.data;
    },
    setVariantImagePrimary: async (productId: string, variantId: string, variantImageId: string): Promise<ApiResponse<ProductVariantImageResponse>> => {
        const response = await axiosInstance.patch<ApiResponse<ProductVariantImageResponse>>(
            ADMIN_ENDPOINTS.PRODUCTS.SET_VARIANT_IMAGE_PRIMARY(productId, variantId, variantImageId)
        );
        return response.data;
    },
    reorderVariantImages: async (productId: string, variantId: string, imageIds: string[]): Promise<ApiResponse<ProductVariantImageResponse[]>> => {
        const response = await axiosInstance.put<ApiResponse<ProductVariantImageResponse[]>>(
            ADMIN_ENDPOINTS.PRODUCTS.REORDER_VARIANT_IMAGES(productId, variantId),
            { imageIds }
        );
        return response.data;
    },
    getProductFaqs: async (productId: string): Promise<ApiResponse<ProductFaqResponse[]>> => {
        const response = await axiosInstance.get<ApiResponse<ProductFaqResponse[]>>(ADMIN_ENDPOINTS.FAQS.GET_FAQS(productId));
        return response.data;
    },
    getProductFaq: async (productId: string, faqId: string): Promise<ApiResponse<ProductFaqResponse>> => {
        const response = await axiosInstance.get<ApiResponse<ProductFaqResponse>>(ADMIN_ENDPOINTS.FAQS.GET_FAQ(productId, faqId));
        return response.data;
    },
    createProductFaq: async (productId: string, data: CreateProductFaqRequest): Promise<ApiResponse<ProductFaqResponse>> => {
        const response = await axiosInstance.post<ApiResponse<ProductFaqResponse>>(ADMIN_ENDPOINTS.FAQS.CREATE_FAQ(productId), data);
        return response.data;
    },
    updateProductFaq: async (productId: string, faqId: string, data: UpdateProductFaqRequest): Promise<ApiResponse<ProductFaqResponse>> => {
        const response = await axiosInstance.put<ApiResponse<ProductFaqResponse>>(ADMIN_ENDPOINTS.FAQS.UPDATE_FAQ(productId, faqId), data);
        return response.data;
    },
    deleteProductFaq: async (productId: string, faqId: string): Promise<ApiResponse<null>> => {
        const response = await axiosInstance.delete<ApiResponse<null>>(ADMIN_ENDPOINTS.FAQS.DELETE_FAQ(productId, faqId));
        return response.data;
    },
    updateProductFaqStatus: async (productId: string, faqId: string, data: UpdateProductFaqStatusRequest): Promise<ApiResponse<ProductFaqResponse>> => {
        const response = await axiosInstance.patch<ApiResponse<ProductFaqResponse>>(ADMIN_ENDPOINTS.FAQS.UPDATE_FAQ_STATUS(productId, faqId), data);
        return response.data;
    },
};
