import type { PageResponse } from "@/types/common/PageResponse.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";

export type PaymentStatus = "PENDING" | "SUCCESS" | "CAPTURED" | "FAILED" | "REFUNDED";

export type PaymentMethod = "COD" | string;

export interface PaymentResponse {
    paymentId: string;
    razorpayOrderId: string;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
}

export interface PaymentListParams extends PaginationRequest {
    search?: string;
    paymentStatus?: PaymentStatus | "";
    paymentMethod?: PaymentMethod | "";
    from?: string;
    to?: string;
    minAmount?: number;
    maxAmount?: number;
}

export type PaymentPageResponse = PageResponse<PaymentResponse>;
