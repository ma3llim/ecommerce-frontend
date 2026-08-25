import { imageFileRule } from "@/validation/rules/Image.rules";
import * as yup from "yup";

export const addCategorySchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Category name is required")
        .min(2, "Category name must be at least 2 characters")
        .max(100, "Category name must not exceed 100 characters"),

    categoryImage: imageFileRule("Category image"),

    active: yup.boolean().required(),
});
export type AddCategoryFormValues = yup.InferType<typeof addCategorySchema>;
