import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewApi } from "@/client/api/Review.api";
import ReviewCard from "./ReviewCard";
import { useState } from "react";
import type { PaginationRequest } from "@/types/common/Pagination.types";

interface ProductReviewsProps {
    productSlug: string;
}

const ProductReviews = ({ productSlug }: ProductReviewsProps) => {
    const [pagination, setPagination] = useState<PaginationRequest>({
        page: 0,
        size: 10,
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product-reviews", productSlug, pagination],
        queryFn: () => ReviewApi.getProductReviews(productSlug, pagination),
        enabled: Boolean(productSlug),
    });

    const reviewPage = data?.data;

    if (isLoading) {
        return (
            <section className="mt-10">
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
                <div className="mt-5 space-y-4">
                    {[1, 2, 3].map(item => (
                        <div key={item} className="h-32 animate-pulse rounded-xl border bg-muted/30" />
                    ))}
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="mt-10">
                <h2 className="text-2xl font-bold">Customer Reviews</h2>

                <div className="mt-5 rounded-xl border p-8 text-center">
                    <p className="text-muted-foreground">Unable to load reviews.</p>
                </div>
            </section>
        );
    }

    const reviews = reviewPage?.content ?? [];

    return (
        <section className="mt-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Customer Reviews</h2>
                    {reviewPage && reviewPage.totalElements > 0 && (
                        <p className="mt-1 text-sm text-muted-foreground">
                            {reviewPage.totalElements} {reviewPage.totalElements === 1 ? "review" : "reviews"}
                        </p>
                    )}
                </div>
            </div>

            {!reviews.length ? (
                <div className="mt-5 flex min-h-40 flex-col items-center justify-center rounded-xl border text-center">
                    <MessageSquare className="h-8 w-8 text-muted-foreground" />

                    <h3 className="mt-3 font-semibold">No reviews yet</h3>

                    <p className="mt-1 text-sm text-muted-foreground">Be the first to review this product.</p>
                </div>
            ) : (
                <>
                    <div className="mt-5 space-y-4">
                        {reviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>

                    {reviewPage && reviewPage.totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-center gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={reviewPage.first}
                                onClick={() =>
                                    setPagination(prev => ({
                                        ...prev,
                                        page: prev.page - 1,
                                    }))
                                }
                            >
                                <ChevronLeft className="mr-1 h-4 w-4" />
                                Previous
                            </Button>

                            <span className="text-sm text-muted-foreground">
                                Page {reviewPage.page + 1} of {reviewPage.totalPages}
                            </span>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={reviewPage.last}
                                onClick={() =>
                                    setPagination(prev => ({
                                        ...prev,
                                        page: prev.page + 1,
                                    }))
                                }
                            >
                                Next
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default ProductReviews;
