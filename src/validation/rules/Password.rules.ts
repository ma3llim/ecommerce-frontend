import * as yup from "yup";

interface PasswordOptions {
    label?: string;
    min?: number;
    required?: boolean;
}

export const PasswordField = ({ label = "Password", min = 8, required = true }: PasswordOptions = {}) => {
    let schema = yup.string().min(min, `${label} must be at least ${min} characters.`);

    if (required) {
        schema = schema.required(`${label} is required.`);
    }

    return schema;
};
