import type { ApiError } from "@/types/common/ApiError.types";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (axios.isAxiosError<ApiError>(error)) {
            return Promise.reject(error.response?.data ?? error);
        }

        return Promise.reject(error);
    }
);

export { axiosInstance };
