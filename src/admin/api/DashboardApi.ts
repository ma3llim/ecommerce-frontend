import { axiosInstance } from "@/config/axios";
import type { DashboardSummary, OrderStatistics, ProductStatistics, UserStatistics } from "../types/Dashboard.types";
import type { ApiResponse } from "@/types/common/ApiResponse.types";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";

export const DashboardApi = {
    getSummary: async (): Promise<DashboardSummary> => {
        const response = await axiosInstance.get<ApiResponse<DashboardSummary>>(ADMIN_ENDPOINTS.DASHBOARD.SUMMARY);
        return response.data.data;
    },
    getOrderStatistics: async (): Promise<OrderStatistics[]> => {
        const response = await axiosInstance.get<ApiResponse<OrderStatistics[]>>(ADMIN_ENDPOINTS.DASHBOARD.ORDER_STATISTICS);
        return response.data.data;
    },
    getProductStatistics: async (): Promise<ProductStatistics[]> => {
        const response = await axiosInstance.get<ApiResponse<ProductStatistics[]>>(ADMIN_ENDPOINTS.DASHBOARD.PRODUCT_STATISTICS);
        return response.data.data;
    },
    getUserStatistics: async (): Promise<UserStatistics[]> => {
        const response = await axiosInstance.get<ApiResponse<UserStatistics[]>>(ADMIN_ENDPOINTS.DASHBOARD.USER_STATISTICS);
        return response.data.data;
    },
};
