import type { ApiResponse } from "@/types/common/ApiResponse.types";

import type { CreateReviewRequest, Review, UpdateReviewRequest } from "@/client/types/Review.types";
import { axiosInstance } from "@/config/axios";
import { ENDPOINTS } from "./Api.endpoints";

export const ReviewApi = {
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
};
