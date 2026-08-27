export type OrderStatus = "PENDING" | "CONFIRMED" | "PACKED" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "CANCELLED";

export type PaymentMethod = "COD" | "CARD" | "UPI" | "NET_BANKING";

export interface OrderPaymentResponse {
    paymentId: string;
    razorpayOrderId: string;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
}

export interface OrderListResponse {
    orderId: string;
    orderNumber: string;
    subtotal: number;
    shippingAmount: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
    couponId?: string;
    couponCode?: string;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    payment?: OrderPaymentResponse;
}

export interface OrderItemResponse {
    orderItem: string;
    orderId: string;
    productName: string;
    variantName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    createdAt: string;
}

export interface OrderShippingAddressResponse {
    addressId: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface OrderShipmentTimelineResponse {
    eventId: string;
    status: string;
    location: string;
    description: string;
    eventTime: string;
}

export interface OrderShipmentResponse {
    shipmentId: string;
    courierName: string;
    trackingNumber: string;
    shipmentStatus: string;
    shippedAt?: string;
    deliveredAt?: string;
    timeline: OrderShipmentTimelineResponse[];
}

export interface OrderDetailsResponse {
    orderId: string;
    orderNumber: string;
    subtotal: number;
    shippingAmount: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    items: OrderItemResponse[];
    payment: OrderPaymentResponse;
    shippingAddress: OrderShippingAddressResponse;
    userShipmentResponse?: OrderShipmentResponse;
}

export interface OrderListParams {
    page: number;
    size: number;
    search?: string;
    orderStatus?: OrderStatus;
    paymentStatus?: PaymentStatus;
}

export interface UpdateOrderStatusRequest {
    status: OrderStatus;
}
