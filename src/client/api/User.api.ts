import { axiosInstance } from "@/config/axios";
import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { User } from "@/types/User.types";
import { ENDPOINTS } from "./Api.endpoints";
import type { ChangePasswordRequest, UpdateUserRequest } from "@/admin/types/users/User.types";

export const UserApi = {
    getCurrentUser: async (): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.get<ApiResponse<User>>(ENDPOINTS.USER.ME);
        return response.data;
    },
    updateUser: async (values: UpdateUserRequest): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.patch<ApiResponse<User>>(ENDPOINTS.USER.ME, values);
        return response.data;
    },
    changePassword: async (values: ChangePasswordRequest): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.patch<ApiResponse<string>>(ENDPOINTS.USER.PASSWORD, values);
        return response.data;
    },
    updateProfileImage: async (file: File): Promise<ApiResponse<User>> => {
        const formData = new FormData();
        formData.append("profileImage", file);

        const response = await axiosInstance.patch<ApiResponse<User>>(ENDPOINTS.USER.PROFILE_IMAGE, formData);
        return response.data;
    },
};
