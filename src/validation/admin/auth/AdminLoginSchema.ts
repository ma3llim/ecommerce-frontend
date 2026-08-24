import { EmailField } from "@/validation/rules/Email.rules";
import { PasswordField } from "@/validation/rules/Password.rules";
import * as yup from "yup";

export const AdminLoginScheme = yup.object({
    email: EmailField({ required: true }),
    password: PasswordField(),
});

export type AdminLoginFormValues = yup.InferType<typeof AdminLoginScheme>;
