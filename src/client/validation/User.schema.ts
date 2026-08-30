import * as yup from "yup";

export const updateUserSchema = yup.object({
    firstName: yup
        .string()
        .trim()
        .required("First name is required.")
        .min(2, "First name must be at least 2 characters.")
        .max(50, "First name must not exceed 50 characters."),
    lastName: yup
        .string()
        .trim()
        .required("Last name is required.")
        .min(2, "Last name must be at least 2 characters.")
        .max(50, "Last name must not exceed 50 characters."),

    phoneNumber: yup.string().trim().required("Phone number is required."),
});

export const updatePasswordSchema = yup.object({
    currentPassword: yup.string().required("Current password is required."),
    password: yup.string().required("New password is required.").min(8, "Password must be at least 8 characters."),
    confirmPassword: yup
        .string()
        .required("Please confirm your password.")
        .oneOf([yup.ref("password")], "Passwords must match."),
});

export type UpdateUserFormValues = yup.InferType<typeof updateUserSchema>;
export type UpdatePasswordFormValues = yup.InferType<typeof updatePasswordSchema>;
