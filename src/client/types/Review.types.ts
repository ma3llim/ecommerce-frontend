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

export interface ReviewFormProps {
    productId: string;
    productVariantId: string;
    review?: Review | null;
    onSuccess?: () => void;
}

export interface ReviewActionsProps {
    review: Review;
    onEdit: () => void;
    onDeleted?: () => void;
    orderId: string;
}

export interface ProductReview {
    id: string;
    rating: number;
    title: string;
    review: string;
    verifiedPurchase: boolean;
    createdAt: string;
}

export interface ProductReviewPage {
    content: ProductReview[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}
