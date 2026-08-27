import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { OrderDetailsResponse, OrderListParams, OrderListResponse, UpdateOrderStatusRequest } from "../types/Order.types";
import type { PageResponse } from "@/types/common/PageResponse.types";
import { axiosInstance } from "@/config/axios";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";

export const OrderApi = {
    getOrders: async (params: OrderListParams): Promise<ApiResponse<PageResponse<OrderListResponse>>> => {
        const response = await axiosInstance.get<ApiResponse<PageResponse<OrderListResponse>>>(ADMIN_ENDPOINTS.ORDER.GET_ALL, {
            params,
        });
        return response.data;
    },
    getOrder: async (orderId: string): Promise<OrderDetailsResponse> => {
        const response = await axiosInstance.get<ApiResponse<OrderDetailsResponse>>(ADMIN_ENDPOINTS.ORDER.GET_BY_ID(orderId));
        return response.data.data;
    },
    cancelOrder: async (orderId: string) => {
        const response = await axiosInstance.patch<ApiResponse<OrderDetailsResponse>>(ADMIN_ENDPOINTS.ORDER.CANCEL(orderId));
        return response.data;
    },
    updateOrderStatus: async (orderId: string, data: UpdateOrderStatusRequest) => {
        const response = await axiosInstance.patch<ApiResponse<OrderDetailsResponse>>(ADMIN_ENDPOINTS.ORDER.UPDATE_STATUS(orderId), data);
        return response.data;
    },
};
