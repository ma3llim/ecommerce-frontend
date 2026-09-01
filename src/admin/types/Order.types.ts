export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
export type OrderStatus = "PENDING" | "CONFIRMED" | "PACKED" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED";
export type PaymentMethod = "COD" | "RAZORPAY";

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
export interface OrderListItem {
    orderId: string;
    orderNumber: string;
    shippingAmount: number;
    discountAmount: number;
    taxAmount: number;
    totalAmount: number;
    couponId: string | null;
    couponCode: string | null;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    createdAt: string;
}

export interface OrderItem {
    orderItem: string;
    orderId: string;
    productId: string;
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
    razorpayOrderId: string | null;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
}

export interface ShippingAddress {
    addressId: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface ShipmentTimeline {
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
    shippedAt: string | null;
    deliveredAt: string | null;
    timeline: ShipmentTimeline[];
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
    userShipmentResponse: UserShipmentResponse | null;
}
export interface CreateOrderRequest {
    shippingAddressId: string;
    paymentMethod: PaymentMethod;
    couponCode?: string;
}

export interface CreateOrderPayment {
    paymentId: string;
    razorpayOrderId: string | null;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
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
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    payment: CreateOrderPayment;
}
export interface OrderListPage {
    content: OrderListItem[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
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
export interface OrderPaymentResponse {
    paymentId: string;
    razorpayOrderId: string;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
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
