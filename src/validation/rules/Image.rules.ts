import * as yup from "yup";

export const imageFileRule = (fieldName = "Image") =>
    yup
        .mixed<File>()
        .required(`${fieldName} is required`)
        .test("fileType", `${fieldName} must be JPG, PNG, or WebP`, file => {
            if (!file) return false;

            return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
        })
        .test("fileSize", `${fieldName} size must not exceed 5MB`, file => {
            if (!file) return false;

            return file.size <= 5 * 1024 * 1024;
        });
