import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewApi } from "@/client/api/Review.api";
import type { ReviewActionsProps } from "@/client/types/Review.types";
import ToastService from "@/services/ToastService";

const ReviewActions = ({ review, onEdit, onDeleted, orderId }: ReviewActionsProps) => {
    const queryClient = useQueryClient();

    const { mutate: deleteReview, isPending } = useMutation({
        mutationFn: () => ReviewApi.deleteReview(review.reviewId),
        onSuccess: response => {
            ToastService.success(response.message || "Review deleted successfully.");
            queryClient.removeQueries({
                queryKey: ["my-review", review.productId, review.productVariantId],
            });
            queryClient.invalidateQueries({
                queryKey: ["order", orderId],
            });
            onDeleted?.();
        },
        onError: error => {
            ToastService.error(error instanceof Error ? error.message : "Failed to delete review.");
        },
    });

    return (
        <div className="mt-4 flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onEdit} disabled={isPending}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
            </Button>
            <Button type="button" variant="destructive" size="sm" onClick={() => deleteReview()} disabled={isPending}>
                <Trash2 className="mr-2 h-4 w-4" />
                {isPending ? "Deleting..." : "Delete"}
            </Button>
        </div>
    );
};

export default ReviewActions;
