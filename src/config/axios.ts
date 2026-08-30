declare module "axios" {
    interface AxiosRequestConfig {
        authType?: UserRole;
        skipAuthRefresh?: boolean;
        _retry?: boolean;
    }
}

import { ADMIN_ENDPOINTS } from "@/admin/api/Admin.endpoints";
import { cleanAdmin, setAccessToken as setAccessTokenAdmin } from "@/admin/store/slice/AdminAuth.slice";
import { setAccessToken } from "@/client/store/slice/UserAuth.slice";
import { ReduxStore } from "@/store/store";
import type { ApiError } from "@/types/common/ApiError.types";
import type { UserRole } from "@/types/UserRole.types";
import axios, { type InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});

// Attach access token to every request
axiosInstance.interceptors.request.use(config => {
    const accessAdminToken = ReduxStore.getState().AdminAuth.accessToken;
    const accessUserToken = ReduxStore.getState().userAuth.accessToken;

    if (accessAdminToken) {
        config.headers.Authorization = `Bearer ${accessAdminToken}`;
        config.authType = "ADMIN";
    } else if (accessUserToken) {
        config.headers.Authorization = `Bearer ${accessUserToken}`;
        config.authType = "USER";
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
            skipAuthRefresh?: boolean;
        };

        if (error.config?.url === ADMIN_ENDPOINTS.AUTH.LOGOUT) {
            return Promise.reject(error.response?.data ?? error);
        }

        if (error.config?.url === ADMIN_ENDPOINTS.AUTH.REFRESH) {
            ReduxStore.dispatch(cleanAdmin());

            return Promise.reject(error.response?.data ?? error);
        }

        // Only handle 401 responses.
        if (error.response?.status !== 401) {
            return Promise.reject(error.response?.data ?? error);
        }

        // Do not refresh the token for requests that explicitly
        // opt out of authentication refresh handling.
        if (originalRequest.skipAuthRefresh) {
            return Promise.reject(error.response?.data ?? error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error.response?.data ?? error);
        }

        originalRequest._retry = true;

        try {
            const response = await axiosInstance.post(ADMIN_ENDPOINTS.AUTH.REFRESH);
            const accessToken = response.data.data.accessToken;

            if (originalRequest.authType === "ADMIN") {
                ReduxStore.dispatch(setAccessTokenAdmin(accessToken));
            } else if (originalRequest.authType === "USER") {
                ReduxStore.dispatch(setAccessToken(accessToken));
            }

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            return axiosInstance(originalRequest);
        } catch (refreshError) {
            ReduxStore.dispatch(cleanAdmin());

            return Promise.reject(refreshError);
        }
    }
);

export { axiosInstance };
