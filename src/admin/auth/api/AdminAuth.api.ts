import { axiosInstance } from "@/api/axios";
import type { LoginRequest, LoginResponse } from "@/types/Login.types";
import { ADMIN_AUTH_ENDPOINTS } from "./AdminAuth.endpoints";
import type { ApiResponse } from "@/types/common/ApiResponse.types";

export const AdminAuthApi = {
    login: async (payload: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
        const response = await axiosInstance.post(ADMIN_AUTH_ENDPOINTS.LOGIN, payload);

        return response.data;
    },

    logout: async () => {
        await axiosInstance.post(ADMIN_AUTH_ENDPOINTS.LOGOUT);
    },
};
