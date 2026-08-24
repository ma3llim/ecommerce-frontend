import * as yup from "yup";

interface StringOptions {
    label?: string;
    required?: boolean;
    min?: number;
    max?: number;
}

export const StringField = ({ label = "This field", required = true, min, max }: StringOptions) => {
    let schema = yup.string().trim().typeError(`${label} must be text.`);

    if (min) {
        schema = schema.min(min, `${label} must be at least ${min} characters.`);
    }

    if (max) {
        schema = schema.max(max, `${label} must not exceed ${max} characters.`);
    }

    if (required) {
        schema = schema.required(`${label} is required.`);
    }

    return schema;
};
