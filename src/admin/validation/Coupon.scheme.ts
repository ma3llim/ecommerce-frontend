import * as yup from "yup";
import type { DiscountType } from "../types/Coupon.types";

export const couponSchema = yup.object({
    code: yup
        .string()
        .trim()
        .required("Coupon code is required")
        .min(3, "Coupon code must be at least 3 characters")
        .max(50, "Coupon code cannot exceed 50 characters"),
    name: yup.string().trim().required("Coupon name is required").max(100, "Coupon name cannot exceed 100 characters"),
    description: yup.string().trim().required("Description is required"),
    discountType: yup.mixed<DiscountType>().oneOf(["PERCENTAGE", "FIXED_AMOUNT"]).required("Discount type is required"),
    discountValue: yup
        .number()
        .typeError("Discount value must be a number")
        .required("Discount value is required")
        .moreThan(0, "Discount value must be greater than 0"),
    minimumOrderAmount: yup
        .number()
        .typeError("Minimum order amount must be a number")
        .required("Minimum order amount is required")
        .min(0, "Minimum order amount cannot be negative"),
    maximumDiscountAmount: yup
        .number()
        .typeError("Maximum discount amount must be a number")
        .required("Maximum discount amount is required")
        .min(0, "Maximum discount amount cannot be negative"),
    usageLimit: yup
        .number()
        .typeError("Usage limit must be a number")
        .required("Usage limit is required")
        .integer("Usage limit must be a whole number")
        .min(1, "Usage limit must be at least 1"),
    validFrom: yup.string().required("Valid from date is required"),
    validUntil: yup.string().required("Valid until date is required"),
});

export type CouponFormValues = yup.InferType<typeof couponSchema>;
