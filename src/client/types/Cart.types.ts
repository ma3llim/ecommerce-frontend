export interface CartItem {
    id: string;
    productName: string;
    productSlug: string;
    productVariantImage: string;
    productVariantId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface Cart {
    id: string;
    totalAmount: number;
    items: CartItem[];
}

export interface AddCartItemRequest {
    productVariantId: string;
    quantity: number;
}

export interface UpdateCartItemRequest {
    quantity: number;
}
