import * as yup from "yup";

export const reviewSchema = yup.object({
    rating: yup.number().required("Please select a rating").min(1, "Please select a rating").max(5, "Rating cannot exceed 5"),

    title: yup
        .string()
        .trim()
        .required("Review title is required")
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot exceed 100 characters"),

    review: yup
        .string()
        .trim()
        .required("Review is required")
        .min(10, "Review must be at least 10 characters")
        .max(1000, "Review cannot exceed 1000 characters"),
});
