import { axiosInstance } from "@/config/axios";
import type { CouponListParams, CouponResponse, CreateCouponRequest, UpdateCouponRequest, UpdateCouponStatusRequest } from "../types/Coupon.types";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";
import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { PageResponse } from "@/types/common/PageResponse.types";

export const CouponApi = {
    getCoupons: async (params: CouponListParams): Promise<ApiResponse<PageResponse<CouponResponse>>> => {
        const response = await axiosInstance.get<ApiResponse<PageResponse<CouponResponse>>>(ADMIN_ENDPOINTS.COUPON.GET_ALL, {
            params,
        });
        return response.data;
    },
    createCoupon: (data: CreateCouponRequest) => axiosInstance.post(ADMIN_ENDPOINTS.COUPON.CREATE, data),
    getCoupon: async (codeId: string): Promise<CouponResponse> => {
        const response = await axiosInstance.get<ApiResponse<CouponResponse>>(ADMIN_ENDPOINTS.COUPON.GET_BY_ID(codeId));
        return response.data.data;
    },
    updateCoupon: (couponId: string, data: UpdateCouponRequest) => axiosInstance.put(ADMIN_ENDPOINTS.COUPON.UPDATE(couponId), data),
    deleteCoupon: (couponId: string) => axiosInstance.delete(ADMIN_ENDPOINTS.COUPON.DELETE(couponId)),
    updateCouponStatus: (couponId: string, data: UpdateCouponStatusRequest) => axiosInstance.patch(ADMIN_ENDPOINTS.COUPON.UPDATE_STATUS(couponId), data),
};
