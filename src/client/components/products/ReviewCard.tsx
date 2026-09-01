import { CheckCircle } from "lucide-react";
import type { ProductReview } from "@/client/types/Review.types";

interface ReviewCardProps {
    review: ProductReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    return (
        <article className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(value => (
                    <span key={value} className={value <= review.rating ? "text-primary" : "text-muted-foreground/30"}>
                        ★
                    </span>
                ))}
            </div>

            <h3 className="mt-3 font-semibold">{review.title}</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">{review.review}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                {review.verifiedPurchase && (
                    <span className="inline-flex items-center gap-1 font-medium text-primary">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Verified Purchase
                    </span>
                )}

                <span>
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </div>
        </article>
    );
};

export default ReviewCard;
