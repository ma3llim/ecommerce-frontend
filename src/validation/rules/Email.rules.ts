import * as yup from "yup";

interface EmailOptions {
    label?: string;
    required?: boolean;
}

export const EmailField = ({ label = "Email", required = true }: EmailOptions) => {
    let schema = yup.string().trim().email(`${label} must be a valid email address.`);

    if (required) {
        schema = schema.required(`${label} is required.`);
    }

    return schema;
};
