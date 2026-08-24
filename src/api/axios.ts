import { ADMIN_AUTH_ENDPOINTS } from "@/admin/auth/api/AdminAuth.endpoints";
import { cleanAdmin, setAccessToken } from "@/admin/store/slice/AdminAuth.slice";
import { ReduxStore } from "@/store/store";
import type { ApiError } from "@/types/common/ApiError.types";
import axios, { type InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach access token to every request
axiosInstance.interceptors.request.use(config => {
    const accessToken = ReduxStore.getState().AdminAuth.accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

// Handle responses and token refresh
axiosInstance.interceptors.response.use(
    response => response,

    async error => {
        if (!axios.isAxiosError<ApiError>(error)) {
            return Promise.reject(error);
        }

        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (error.config?.url === ADMIN_AUTH_ENDPOINTS.LOGOUT) {
            return Promise.reject(error.response?.data ?? error);
        }

        if (error.config?.url === ADMIN_AUTH_ENDPOINTS.REFRESH) {
            ReduxStore.dispatch(cleanAdmin());

            return Promise.reject(error.response?.data ?? error);
        }

        // Only handle 401 responses.
        if (error.response?.status !== 401) {
            return Promise.reject(error.response?.data ?? error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error.response?.data ?? error);
        }

        originalRequest._retry = true;

        try {
            const response = await axiosInstance.post(ADMIN_AUTH_ENDPOINTS.REFRESH);
            const accessToken = response.data.data.accessToken;

            ReduxStore.dispatch(setAccessToken(accessToken));

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            return axiosInstance(originalRequest);
        } catch (refreshError) {
            ReduxStore.dispatch(cleanAdmin());

            return Promise.reject(refreshError);
        }
    }
);

export { axiosInstance };
