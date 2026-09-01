export type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT";

export interface CouponCreateRequest {
    code: string;
    name: string;
    description: string;
    discountType: DiscountType;
    discountValue: number;
    minimumOrderAmount: number;
    maximumDiscountAmount: number;
    usageLimit: number;
    validFrom: string;
    validUntil: string;
}

export interface CouponUpdateRequest {
    name: string;
    description: string;
    discountType: DiscountType;
    discountValue: number;
    minimumOrderAmount: number;
    maximumDiscountAmount: number;
    usageLimit: number;
    validFrom: string;
    validUntil: string;
}

export type CouponStatus = "ACTIVE" | "INACTIVE";

export interface CouponResponse {
    id: string;
    code: string;
    name: string;
    description: string;
    discountType: DiscountType;
    discountValue: number;
    minimumOrderAmount: number;
    maximumDiscountAmount: number;
    usageLimit: number;
    usedCount: number;
    validFrom: string;
    validUntil: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCouponRequest {
    code: string;
    name: string;
    description: string;
    discountType: DiscountType;
    discountValue: number;
    minimumOrderAmount: number;
    maximumDiscountAmount: number;
    usageLimit: number;
    validFrom: string;
    validUntil: string;
}
export interface UpdateCouponRequest {
    name: string;
    description: string;
    discountType: DiscountType;
    discountValue: number;
    minimumOrderAmount: number;
    maximumDiscountAmount: number;
    usageLimit: number;
    validFrom: string;
    validUntil: string;
}

export interface UpdateCouponStatusRequest {
    status: CouponStatus;
}

export interface CouponListParams {
    search?: string;
    page: number;
    size: number;
    sort?: string[];
}

export interface CouponFormProps {
    initialData?: CouponResponse;
    isEdit?: boolean;
    isPending?: boolean;
    onSubmit: (data: CreateCouponRequest | UpdateCouponRequest) => void;
    onCancel: () => void;
}
