import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import type { PaymentPageResponse, PaymentResponse } from "../types/Payment.types";
import { axiosInstance } from "@/config/axios";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";

export const PaymentApi = {
    getPayments: async (params: PaginationRequest): Promise<ApiResponse<PaymentPageResponse>> => {
        const response = await axiosInstance.get<ApiResponse<PaymentPageResponse>>(ADMIN_ENDPOINTS.PAYMENT.GET_ALL, {
            params,
        });
        return response.data;
    },
    getPayment: async (paymentId: string): Promise<PaymentResponse> => {
        const response = await axiosInstance.get<ApiResponse<PaymentResponse>>(ADMIN_ENDPOINTS.PAYMENT.GET_BY_ID(paymentId));
        return response.data.data;
    },
};
