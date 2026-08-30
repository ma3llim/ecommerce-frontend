import type { ApiResponse } from "@/types/common/ApiResponse.types";
import { axiosInstance } from "@/config/axios";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";
import type { LoginRequest, LoginResponse } from "../types/AdminAuth.types";

export const AdminAuthApi = {
    login: async (payload: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
        const response = await axiosInstance.post(ADMIN_ENDPOINTS.AUTH.LOGIN, payload);

        return response.data;
    },

    logout: async () => {
        await axiosInstance.post(ADMIN_ENDPOINTS.AUTH.LOGOUT);
    },
    refreshToken: async (): Promise<ApiResponse<LoginResponse>> => {
        const response = await axiosInstance.post(ADMIN_ENDPOINTS.AUTH.REFRESH);
        return response.data;
    },
};
