import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { InitiatePaymentResponse } from "../types/Order.types";
import { axiosInstance } from "@/config/axios";
import { ENDPOINTS } from "./Api.endpoints";

export const PaymentApi = {
    initiatePayment: async (orderId: string): Promise<ApiResponse<InitiatePaymentResponse>> => {
        const response = await axiosInstance.post<ApiResponse<InitiatePaymentResponse>>(ENDPOINTS.PAYMENTS.INITIATE(orderId));
        return response.data;
    },
};
