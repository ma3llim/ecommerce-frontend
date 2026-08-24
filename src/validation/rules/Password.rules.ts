import * as yup from "yup";

interface PasswordOptions {
    label?: string;
    min?: number;
    max?: number;
    required?: boolean;
}

export const PasswordField = ({ label = "Password", min = 8, max = 16, required = true }: PasswordOptions = {}) => {
    let schema = yup.string().min(min, `${label} must be at least ${min} characters.`);

    if (required) {
        schema = schema.required(`${label} is required.`);
    }
    if (max) {
        schema = schema.max(max, `${label} must not exceed ${max} characters.`);
    }
    return schema;
};
