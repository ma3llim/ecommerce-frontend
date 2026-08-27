export interface ProductFaqResponse {
    id: string;
    productId: string;
    question: string;
    answer: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductFaqRequest {
    question: string;
    answer: string;
}

export interface UpdateProductFaqRequest {
    question: string;
    answer: string;
}

export interface UpdateProductFaqStatusRequest {
    active: boolean;
}
