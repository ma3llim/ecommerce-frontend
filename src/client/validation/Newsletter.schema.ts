import * as yup from "yup";

export const newsletterSchema = yup.object({
    email: yup.string().trim().required("Email is required.").email("Please enter a valid email address."),
});

export type NewsletterFormValues = yup.InferType<typeof newsletterSchema>;
