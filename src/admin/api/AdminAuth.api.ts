import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { LoginRequest } from "@/types/Login.types";
import type { LoginResponse } from "../types/AdminAuth.types";
import { axiosInstance } from "@/config/axios";
import { ADMIN_ENDPOINTS } from "./AdminAuth.endpoints";

export const AdminAuthApi = {
    login: async (payload: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
        const response = await axiosInstance.post(ADMIN_ENDPOINTS.AUTH.LOGIN, payload);

        return response.data;
    },

    logout: async () => {
        await axiosInstance.post(ADMIN_ENDPOINTS.AUTH.LOGOUT);
    },
};
