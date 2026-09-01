import * as yup from "yup";

export const addProductSchema = yup.object({
    categoryId: yup.string().required("Category is required"),
    name: yup
        .string()
        .trim()
        .required("Product name is required")
        .min(2, "Product name must be at least 2 characters")
        .max(150, "Product name must not exceed 150 characters"),
    description: yup.string().trim().required("Description is required").max(2000, "Description must not exceed 2000 characters"),
    specifications: yup
        .array()
        .of(
            yup.object({
                key: yup.string().trim().required("Specification name is required"),
                value: yup.string().trim().required("Specification value is required"),
            })
        )
        .required(),
});

export const updateProductSchema = yup.object({
    categoryId: yup.string().required("Category is required"),
    name: yup
        .string()
        .trim()
        .required("Product name is required")
        .min(2, "Product name must be at least 2 characters")
        .max(150, "Product name must not exceed 150 characters"),
    description: yup.string().trim().required("Description is required").max(2000, "Description must not exceed 2000 characters"),
    specifications: yup
        .array()
        .of(
            yup.object({
                key: yup.string().trim().required("Specification name is required"),

                value: yup.string().trim().required("Specification value is required"),
            })
        )
        .required(),
});

export type UpdateProductFormValues = yup.InferType<typeof updateProductSchema>;
export type AddProductFormValues = yup.InferType<typeof addProductSchema>;
