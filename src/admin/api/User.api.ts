import type { AccountStatus } from "@/types/AccountStatus.types";
import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { PageResponse } from "@/types/common/PageResponse.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import type { UpdateUserStatusRequest, UserDetailsResponse, UserListResponse } from "../types/users/User.types";
import { axiosInstance } from "@/config/axios";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";

export const UserApi = {
    getUsers: async (
        params: PaginationRequest & {
            search?: string;
            accountStatus?: AccountStatus;
        }
    ): Promise<ApiResponse<PageResponse<UserListResponse>>> => {
        const response = await axiosInstance.get(ADMIN_ENDPOINTS.USERS.GET_USERS, { params });
        return response.data;
    },
    getUserDetails: async (userId: string): Promise<ApiResponse<UserDetailsResponse>> => {
        const response = await axiosInstance.get(ADMIN_ENDPOINTS.USERS.GET_USER_DETAILS(userId));
        return response.data;
    },
    updateUserStatus: async (userId: string, data: UpdateUserStatusRequest): Promise<ApiResponse<AccountStatus>> => {
        const response = await axiosInstance.patch(ADMIN_ENDPOINTS.USERS.UPDATE_USER_STATUS(userId), data);
        return response.data;
    },
};
