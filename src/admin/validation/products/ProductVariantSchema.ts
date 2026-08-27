import * as yup from "yup";

export interface ProductVariantFormValues {
    price: number;
    stockQuantity: number;
    attributes: {
        key: string;
        value: string;
    }[];
}

export const productVariantSchema = yup.object({
    price: yup.number().typeError("Price must be a number").required("Price is required").min(0, "Price cannot be negative"),
    stockQuantity: yup
        .number()
        .typeError("Stock quantity must be a number")
        .required("Stock quantity is required")
        .integer("Stock quantity must be an integer")
        .min(0, "Stock quantity cannot be negative"),
    attributes: yup
        .array()
        .of(
            yup.object({
                key: yup.string().trim().required("Attribute name is required"),
                value: yup.string().trim().required("Attribute value is required"),
            })
        )
        .min(1, "At least one attribute is required")
        .required(),
});
