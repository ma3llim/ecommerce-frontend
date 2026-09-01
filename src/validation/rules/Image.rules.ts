import * as yup from "yup";

export const imageFileRule = (fieldName = "Image", required = true) => {
    let schema = yup
        .mixed<File>()
        .test("fileType", `${fieldName} must be JPG, PNG, or WebP`, file => {
            if (!file) return true;

            return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
        })
        .test("fileSize", `${fieldName} size must not exceed 5MB`, file => {
            if (!file) return true;

            return file.size <= 5 * 1024 * 1024;
        });

    if (required) {
        schema = schema.required(`${fieldName} is required`);
    }

    return schema;
};
