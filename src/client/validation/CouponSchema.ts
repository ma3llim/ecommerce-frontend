import * as yup from "yup";

export const couponSchema = yup.object({
    code: yup
        .string()
        .trim()
        .required("Coupon code is required")
        .min(3, "Coupon code must be at least 3 characters")
        .max(50, "Coupon code must not exceed 50 characters"),
});
