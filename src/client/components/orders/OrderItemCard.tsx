import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { OrderItem } from "@/client/types/Order.types";
import { ReviewApi } from "@/client/api/Review.api";
import ReviewActions from "../reviews/ReviewActions";
import ReviewForm from "../reviews/ReviewForm";

interface OrderItemCardProps {
    item: OrderItem;
    canReview: boolean;
}

const OrderItemCard = ({ item, canReview }: OrderItemCardProps) => {
    const [showReviewForm, setShowReviewForm] = useState(false);

    const { data: reviewResponse, isLoading } = useQuery({
        queryKey: ["my-review", item.productId, item.variantId],
        queryFn: () => ReviewApi.getMyReview(item.productId, item.variantId),
        enabled: canReview && Boolean(item.productId) && Boolean(item.variantId),
    });

    const review = reviewResponse?.data ?? null;

    return (
        <div className="border-b py-5 first:pt-0 last:border-b-0 last:pb-0">
            <div className="flex gap-4">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border">
                    <img src={item.imageUrl} alt={item.productName} className="h-full w-full object-contain" />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 font-semibold">{item.productName}</h3>

                    <p className="mt-1 text-sm text-muted-foreground">{item.variantName}</p>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Qty: <span className="font-medium text-foreground">{item.quantity}</span>
                    </p>
                </div>

                <div className="shrink-0 text-right">
                    <p className="font-semibold">₹{item.totalPrice.toLocaleString("en-IN")}</p>

                    <p className="mt-1 text-xs text-muted-foreground">₹{item.unitPrice.toLocaleString("en-IN")} each</p>
                </div>
            </div>

            {canReview && (
                <div className="mt-4">
                    {isLoading ? (
                        <p className="text-sm text-muted-foreground">Checking review...</p>
                    ) : review ? (
                        <>
                            <div className="rounded-xl border bg-muted/20 p-4">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(value => (
                                        <span key={value} className={value <= review.rating ? "text-primary" : "text-muted-foreground"}>
                                            ★
                                        </span>
                                    ))}
                                </div>

                                <h4 className="mt-2 font-semibold">{review.title}</h4>

                                <p className="mt-1 text-sm text-muted-foreground">{review.review}</p>

                                {review.verifiedPurchase && <p className="mt-2 text-xs font-medium text-primary">Verified Purchase</p>}
                            </div>

                            {!showReviewForm && <ReviewActions review={review} onEdit={() => setShowReviewForm(true)} orderId={item.orderId} />}

                            {showReviewForm && (
                                <ReviewForm
                                    productId={item.productId}
                                    productVariantId={item.variantId}
                                    review={review}
                                    onSuccess={() => setShowReviewForm(false)}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            {!showReviewForm && (
                                <Button type="button" variant="outline" size="sm" onClick={() => setShowReviewForm(true)}>
                                    Add Review
                                </Button>
                            )}

                            {showReviewForm && (
                                <ReviewForm productId={item.productId} productVariantId={item.variantId} onSuccess={() => setShowReviewForm(false)} />
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderItemCard;
