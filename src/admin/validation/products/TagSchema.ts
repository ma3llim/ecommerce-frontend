import * as yup from "yup";

export const addTagSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Tag name is required")
        .min(2, "Tag name must be at least 2 characters")
        .max(50, "Tag name must not exceed 50 characters"),
});

export const updateTagSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Tag name is required")
        .min(2, "Tag name must be at least 2 characters")
        .max(50, "Tag name must not exceed 50 characters"),
});

export type AddTagFormValues = yup.InferType<typeof addTagSchema>;
export type UpdateTagFormValues = yup.InferType<typeof updateTagSchema>;
