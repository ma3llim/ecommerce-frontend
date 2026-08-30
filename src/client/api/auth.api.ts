import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type {
    AuthenticationData,
    ForgotPasswordRequest,
    RegisterRequest,
    ResendVerificationRequest,
    ResetPasswordRequest,
    VerifyEmailRequest,
} from "../types/Auth.types";
import type { User } from "@/types/User.types";
import { axiosInstance } from "@/config/axios";
import { ENDPOINTS } from "./Api.endpoints";
import type { LoginRequest } from "../types/User.types";

export const AuthApi = {
    registerUser: async (values: RegisterRequest): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.post<ApiResponse<User>>(ENDPOINTS.AUTH.REGISTER, values);
        return response.data;
    },
    loginUser: async (values: LoginRequest): Promise<ApiResponse<AuthenticationData>> => {
        const response = await axiosInstance.post<ApiResponse<AuthenticationData>>(ENDPOINTS.AUTH.LOGIN, values);
        return response.data;
    },
    verifyEmail: async (values: VerifyEmailRequest): Promise<ApiResponse<AuthenticationData>> => {
        const response = await axiosInstance.post<ApiResponse<AuthenticationData>>(ENDPOINTS.AUTH.VERIFY_EMAIL, values, { skipAuthRefresh: true });
        return response.data;
    },
    resendVerification: async (values: ResendVerificationRequest): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.post<ApiResponse<string>>(ENDPOINTS.AUTH.RESEND_VERIFICATION, values);
        return response.data;
    },
    forgotPassword: async (values: ForgotPasswordRequest): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.post<ApiResponse<string>>(ENDPOINTS.AUTH.FORGOT_PASSWORD, values);
        return response.data;
    },
    resetPassword: async (values: ResetPasswordRequest): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.post<ApiResponse<void>>(ENDPOINTS.AUTH.RESET_PASSWORD, values, { skipAuthRefresh: true });
        return response.data;
    },
    logoutUser: async (): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.post<ApiResponse<string>>(ENDPOINTS.AUTH.LOGOUT);
        return response.data;
    },
    refreshToken: async (): Promise<ApiResponse<AuthenticationData>> => {
        const response = await axiosInstance.post<ApiResponse<AuthenticationData>>(ENDPOINTS.AUTH.REFRESH_TOKEN);
        return response.data;
    },
};
