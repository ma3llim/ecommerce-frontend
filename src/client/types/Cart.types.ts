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

export interface CartItemCardProps {
    item: CartItem;
    isUpdating: boolean;
    isDeleting: boolean;
    onQuantityChange: (item: CartItem, quantity: number) => void;
    onDelete: (item: CartItem) => void;
}

export interface CartSummaryProps {
    cart: Cart | undefined;
}

export interface CouponCodeResponse {
    subtotal: number;
    discountAmount: number;
    totalAmount: number;
    couponCode: string;
}
