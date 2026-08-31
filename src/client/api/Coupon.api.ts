import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { ApplyCouponRequest } from "../types/Coupon.types";
import { axiosInstance } from "@/config/axios";
import { ENDPOINTS } from "./Api.endpoints";
import type { CouponCodeResponse } from "../types/Cart.types";

export const CouponApi = {
    applyCoupon: async (values: ApplyCouponRequest): Promise<ApiResponse<CouponCodeResponse>> => {
        const response = await axiosInstance.post<ApiResponse<CouponCodeResponse>>(ENDPOINTS.COUPON.APPLY, values);
        return response.data;
    },
};
