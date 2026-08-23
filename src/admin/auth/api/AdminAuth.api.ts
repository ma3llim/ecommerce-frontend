import { axiosInstance } from "@/api/axios";
import type { LoginRequest, LoginResponse } from "@/types/Login.types";
import { ADMIN_AUTH_ENDPOINTS } from "./AdminAuth.endpoints";

export const AdminAuthApi = {
    login: async (payload: LoginRequest): Promise<LoginResponse> => {
        const response = await axiosInstance.post(ADMIN_AUTH_ENDPOINTS.LOGIN, payload);

        return response.data;
    },

    logout: async () => {
        await axiosInstance.post(ADMIN_AUTH_ENDPOINTS.LOGOUT);
    },
};
