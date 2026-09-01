import type { ApiResponse } from "@/types/common/ApiResponse.types";

import type { CreateReviewRequest, ProductReviewPage, Review, UpdateReviewRequest } from "@/client/types/Review.types";
import { axiosInstance } from "@/config/axios";
import { ENDPOINTS } from "./Api.endpoints";
import type { PaginationRequest } from "@/types/common/Pagination.types";

export const ReviewApi = {
    getMyReview: async (productId: string, productVariantId: string): Promise<ApiResponse<Review | null>> => {
        const response = await axiosInstance.get<ApiResponse<Review>>(ENDPOINTS.REVIEW.GET(productId, productVariantId));
        return response.data;
    },
    createReview: async (request: CreateReviewRequest): Promise<ApiResponse<Review>> => {
        const response = await axiosInstance.post<ApiResponse<Review>>(ENDPOINTS.REVIEW.CREATE, request);
        return response.data;
    },
    updateReview: async (reviewId: string, request: UpdateReviewRequest): Promise<ApiResponse<Review>> => {
        const response = await axiosInstance.patch<ApiResponse<Review>>(ENDPOINTS.REVIEW.UPDATE(reviewId), request);
        return response.data;
    },
    deleteReview: async (reviewId: string): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.delete<ApiResponse<string>>(ENDPOINTS.REVIEW.DELETE(reviewId));
        return response.data;
    },
    getProductReviews: async (productSlug: string, pagination: PaginationRequest): Promise<ApiResponse<ProductReviewPage>> => {
        const response = await axiosInstance.get<ApiResponse<ProductReviewPage>>(ENDPOINTS.REVIEW.GET_PRODUCT_REVIEWS(productSlug), {
            params: pagination,
        });
        return response.data;
    },
};
