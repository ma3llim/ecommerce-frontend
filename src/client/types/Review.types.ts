export interface CreateReviewRequest {
    productId: string;
    productVariantId: string;
    rating: number;
    title: string;
    review: string;
}

export interface UpdateReviewRequest {
    rating: number;
    title: string;
    review: string;
}

export interface Review {
    reviewId: string;
    productId: string;
    productVariantId: string;
    rating: number;
    title: string;
    review: string;
    verifiedPurchase: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductReview {
    id: string;
    rating: number;
    title: string;
    review: string;
    verifiedPurchase: boolean;
    createdAt: string;
}
