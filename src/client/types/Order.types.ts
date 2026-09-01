export type OrderStatus = "PENDING" | "CONFIRMED" | "PACKED" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED";
export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
export type PaymentMethod = "COD" | "RAZORPAY";

export interface OrderListItem {
    orderId: string;
    orderNumber: string;
    shippingAmount: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
    couponId?: string | null;
    couponCode?: string | null;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    createdAt: string;
}

export interface OrderItem {
    orderItem: string;
    orderId: string;
    productId: string;
    imageUrl: string;
    productVariantId: string;
    productSlug: string;
    productName: string;
    variantName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    createdAt: string;
}

export interface OrderPayment {
    paymentId: string;
    razorpayOrderId?: string | null;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
}

export interface ShippingAddress {
    addressId: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface ShipmentTimelineItem {
    eventId: string;
    status: string;
    location: string;
    description: string;
    eventTime: string;
}

export interface UserShipmentResponse {
    shipmentId: string;
    courierName: string;
    trackingNumber: string;
    shipmentStatus: string;
    shippedAt?: string | null;
    deliveredAt?: string | null;
    timeline: ShipmentTimelineItem[];
}

export interface OrderDetail {
    orderId: string;
    orderNumber: string;
    subtotal: number;
    shippingAmount: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    items: OrderItem[];
    payment: OrderPayment;
    shippingAddress: ShippingAddress;
    userShipmentResponse?: UserShipmentResponse | null;
}
