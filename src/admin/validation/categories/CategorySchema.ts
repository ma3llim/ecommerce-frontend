import { imageFileRule } from "@/validation/rules/Image.rules";
import * as yup from "yup";

export const addCategorySchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Category name is required")
        .min(2, "Category name must be at least 2 characters")
        .max(100, "Category name must not exceed 100 characters"),
    categoryImage: imageFileRule("Category image", true),
    active: yup.boolean().required(),
});

export const updateCategorySchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Category name is required")
        .min(2, "Category name must be at least 2 characters")
        .max(100, "Category name must not exceed 100 characters"),
    categoryImage: imageFileRule("Category image", false),
    active: yup.boolean().required(),
});

export interface UpdateCategoryFormValues {
    name: string;
    categoryImage?: File;
    active: boolean;
}

export type AddCategoryFormValues = yup.InferType<typeof addCategorySchema>;
