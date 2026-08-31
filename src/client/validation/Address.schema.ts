import * as yup from "yup";

export const addressSchema = yup.object({
    fullName: yup
        .string()
        .trim()
        .required("Full name is required.")
        .min(2, "Full name must be at least 2 characters.")
        .max(100, "Full name must not exceed 100 characters."),
    phoneNumber: yup
        .string()
        .trim()
        .required("Phone number is required.")
        .matches(/^[0-9+\-\s()]+$/, "Enter a valid phone number."),
    addressLineOne: yup.string().trim().required("Address line 1 is required.").max(200, "Address line 1 must not exceed 200 characters."),
    addressLineTwo: yup.string().trim().max(200, "Address line 2 must not exceed 200 characters.").default(""),
    city: yup.string().trim().required("City is required.").max(100, "City must not exceed 100 characters."),
    state: yup.string().trim().required("State is required.").max(100, "State must not exceed 100 characters."),
    country: yup.string().trim().required("Country is required.").max(100, "Country must not exceed 100 characters."),
    postalCode: yup.string().trim().required("Postal code is required.").max(20, "Postal code must not exceed 20 characters."),
    addressType: yup.mixed<"HOME" | "OFFICE" | "OTHER">().oneOf(["HOME", "OFFICE", "OTHER"]).required("Address type is required."),
    defaultShipping: yup.boolean().required(),
    defaultBilling: yup.boolean().required(),
});

export type AddressFormSchemaValues = yup.InferType<typeof addressSchema>;
