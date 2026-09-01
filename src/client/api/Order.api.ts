import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { OrderDetail, OrderListItem } from "../types/Order.types";
import { axiosInstance } from "@/config/axios";
import { ENDPOINTS } from "./Api.endpoints";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import type { PageResponse } from "@/types/common/PageResponse.types";
import type { CreateOrderRequest, CreateOrderResponse } from "@/admin/types/Order.types";

export const OrderApi = {
    createOrder: async (values: CreateOrderRequest): Promise<ApiResponse<CreateOrderResponse>> => {
        const response = await axiosInstance.post<ApiResponse<CreateOrderResponse>>(ENDPOINTS.ORDERS.BASE, values);
        return response.data;
    },
    getOrders: async ({ pagination }: { pagination: PaginationRequest }): Promise<ApiResponse<PageResponse<OrderListItem>>> => {
        const response = await axiosInstance.get<ApiResponse<PageResponse<OrderListItem>>>(ENDPOINTS.ORDERS.BASE, {
            params: {
                ...pagination,
            },
        });
        return response.data;
    },
    getOrderDetails: async (orderId: string): Promise<ApiResponse<OrderDetail>> => {
        const response = await axiosInstance.get<ApiResponse<OrderDetail>>(ENDPOINTS.ORDERS.GET_ORDER(orderId));
        return response.data;
    },
    cancelOrder: async (orderId: string): Promise<ApiResponse<OrderListItem>> => {
        const response = await axiosInstance.patch<ApiResponse<OrderListItem>>(ENDPOINTS.ORDERS.CANCEL_ORDER(orderId));
        return response.data;
    },
};
