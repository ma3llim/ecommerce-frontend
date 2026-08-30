import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().trim().email("Please enter a valid email address").required("Email is required"),
    password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object({
    firstName: yup
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must not exceed 50 characters")
        .required("First name is required"),
    lastName: yup
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name must not exceed 50 characters")
        .required("Last name is required"),
    email: yup.string().trim().email("Please enter a valid email address").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

export const forgotPasswordSchema = yup.object({
    email: yup.string().trim().email("Please enter a valid email address").required("Email is required"),
});

export const otpSchema = yup.object({
    otp: yup
        .string()
        .matches(/^\d{6}$/, "OTP must be 6 digits")
        .required("OTP is required"),
});

export const resetPasswordSchema = yup.object({
    otp: yup
        .string()
        .matches(/^\d{6}$/, "OTP must be 6 digits")
        .required("OTP is required"),

    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});
