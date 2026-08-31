export type PaymentMethod = "COD" | "RAZORPAY";

export interface CreateOrderRequest {
    shippingAddressId: string;
    paymentMethod: PaymentMethod;
    couponCode?: string;
}

export interface CreateOrderResponse {
    orderId: string;
    orderNumber: string;
    subtotal: number;
    shippingAmount: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
    couponId: string | null;
    couponCode: string | null;
    paymentStatus: string;
    orderStatus: string;
    payment: {
        paymentId: string;
        razorpayOrderId: string | null;
        amount: number;
        currency: string;
        paymentMethod: PaymentMethod;
        paymentStatus: string;
    };
}
