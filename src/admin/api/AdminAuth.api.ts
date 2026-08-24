import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { LoginRequest } from "@/types/Login.types";
import type { LoginResponse } from "../types/AdminAuth.types";
import { ADMIN_AUTH_ENDPOINTS } from "./AdminAuth.endpoints";
import { axiosInstance } from "@/config/axios";

export const AdminAuthApi = {
    login: async (payload: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
        const response = await axiosInstance.post(ADMIN_AUTH_ENDPOINTS.LOGIN, payload);

        return response.data;
    },

    logout: async () => {
        await axiosInstance.post(ADMIN_AUTH_ENDPOINTS.LOGOUT);
    },
};
