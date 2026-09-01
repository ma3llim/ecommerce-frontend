import * as yup from "yup";

export const contactUsSchema = yup.object({
    firstName: yup.string().trim().required("First name is required").min(2, "First name must be at least 2 characters"),
    lastName: yup.string().trim().required("Last name is required").min(2, "Last name must be at least 2 characters"),
    email: yup.string().trim().email("Enter a valid email address").required("Email is required"),
    subject: yup.string().trim().required("Subject is required").min(3, "Subject must be at least 3 characters"),
    message: yup.string().trim().required("Message is required").min(10, "Message must be at least 10 characters"),
});

export type ContactUsFormValues = yup.InferType<typeof contactUsSchema>;
