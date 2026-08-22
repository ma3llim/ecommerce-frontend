import type { AuthUser, LoginRequest } from '@/types/admin/auth';
import { api } from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import type { ApiResponse } from '@/types/api';

export const login = async (data: LoginRequest): Promise<ApiResponse<AuthUser>> => {
    const response = await api.post<ApiResponse<AuthUser>>(API_ENDPOINTS.auth.login, data);
    return response.data;
};

export const logout = async () => {
    const response = await api.post(API_ENDPOINTS.auth.logout);
    return response.data;
};
