import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ReviewApi } from "@/client/api/Review.api";
import type { ReviewFormProps } from "@/client/types/Review.types";
import { reviewSchema, type ReviewFormValues } from "@/client/validation/Review.schema";
import ToastService from "@/services/ToastService";

const ReviewForm = ({ productId, productVariantId, review, onSuccess }: ReviewFormProps) => {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<ReviewFormValues>({
        resolver: yupResolver(reviewSchema),
        defaultValues: {
            rating: review?.rating ?? 0,
            title: review?.title ?? "",
            review: review?.review ?? "",
        },
    });

    const rating = watch("rating");

    useEffect(() => {
        reset({
            rating: review?.rating ?? 0,
            title: review?.title ?? "",
            review: review?.review ?? "",
        });
    }, [review, reset]);

    const { mutate: createReview, isPending: isCreating } = useMutation({
        mutationFn: ReviewApi.createReview,

        onSuccess: response => {
            ToastService.success(response.message || "Review added successfully.");

            queryClient.invalidateQueries({
                queryKey: ["my-review", productId, productVariantId],
            });

            queryClient.invalidateQueries({
                queryKey: ["product-reviews"],
            });

            onSuccess?.();
        },

        onError: error => {
            ToastService.error(error instanceof Error ? error.message : "Failed to add review.");
        },
    });

    const { mutate: updateReview, isPending: isUpdating } = useMutation({
        mutationFn: ({ reviewId, values }: { reviewId: string; values: ReviewFormValues }) => ReviewApi.updateReview(reviewId, values),

        onSuccess: response => {
            ToastService.success(response.message || "Review updated successfully.");

            queryClient.invalidateQueries({
                queryKey: ["my-review", productId, productVariantId],
            });

            queryClient.invalidateQueries({
                queryKey: ["product-reviews"],
            });

            onSuccess?.();
        },

        onError: error => {
            ToastService.error(error instanceof Error ? error.message : "Failed to update review.");
        },
    });

    const isPending = isCreating || isUpdating;

    const onSubmit = (values: ReviewFormValues) => {
        if (review?.reviewId) {
            updateReview({
                reviewId: review.reviewId,
                values,
            });

            return;
        }

        createReview({
            productId,
            productVariantId,
            ...values,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 rounded-xl border bg-muted/20 p-5">
            <div>
                <h3 className="font-semibold">{review ? "Edit your review" : "Add a review"}</h3>

                <p className="mt-1 text-sm text-muted-foreground">Share your experience with this product.</p>
            </div>

            {/* Rating */}
            <div className="mt-5">
                <label className="text-sm font-medium">Rating</label>

                <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4, 5].map(value => (
                        <button
                            key={value}
                            type="button"
                            onClick={() =>
                                setValue("rating", value, {
                                    shouldValidate: true,
                                })
                            }
                            className="rounded-md p-1 hover:bg-muted"
                        >
                            <Star className={`h-5 w-5 ${value <= rating ? "fill-current text-primary" : "text-muted-foreground"}`} />
                        </button>
                    ))}
                </div>

                {errors.rating && <p className="mt-1 text-sm text-destructive">{errors.rating.message}</p>}
            </div>

            {/* Title */}
            <div className="mt-5">
                <label htmlFor={`review-title-${productVariantId}`} className="text-sm font-medium">
                    Title
                </label>

                <Input id={`review-title-${productVariantId}`} className="mt-2" placeholder="Summarize your experience" {...register("title")} />

                {errors.title && <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>}
            </div>

            {/* Review */}
            <div className="mt-5">
                <label htmlFor={`review-${productVariantId}`} className="text-sm font-medium">
                    Your Review
                </label>

                <Textarea
                    id={`review-${productVariantId}`}
                    className="mt-2 min-h-28 resize-none"
                    placeholder="Tell us about your experience..."
                    {...register("review")}
                />

                {errors.review && <p className="mt-1 text-sm text-destructive">{errors.review.message}</p>}
            </div>

            <div className="mt-5 flex gap-3">
                <Button type="submit" disabled={isPending}>
                    {isPending ? (review ? "Updating..." : "Submitting...") : review ? "Update Review" : "Submit Review"}
                </Button>

                {onSuccess && (
                    <Button type="button" variant="outline" disabled={isPending} onClick={onSuccess}>
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
};

export default ReviewForm;
