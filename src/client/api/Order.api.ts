import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { CreateOrderRequest, CreateOrderResponse } from "../types/Order.types";
import { axiosInstance } from "@/config/axios";
import { ENDPOINTS } from "./Api.endpoints";

export const OrderApi = {
    createOrder: async (values: CreateOrderRequest): Promise<ApiResponse<CreateOrderResponse>> => {
        const response = await axiosInstance.post<ApiResponse<CreateOrderResponse>>(ENDPOINTS.ORDERS.BASE, values);

        return response.data;
    },
};
