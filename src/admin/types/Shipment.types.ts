export type ShipmentStatus = "PENDING" | "SHIPPED" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED";

export interface ShipmentTimelineResponse {
    eventId: string;
    status: ShipmentStatus;
    location: string;
    description: string;
    eventTime: string;
}

export interface ShipmentResponse {
    shipmentId: string;
    orderId: string;
    courierName: string;
    trackingNumber: string;
    shipmentStatus: ShipmentStatus;
    shippedAt: string | null;
    deliveredAt: string | null;
    createdAt: string;
    updatedAt: string;
    timeline: ShipmentTimelineResponse[];
}

export interface ShipmentListResponse {
    content: ShipmentResponse[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

export interface ShipmentFilters {
    search?: string;
    shipmentStatus?: ShipmentStatus;
    courierName?: string;
    from?: string;
    to?: string;
    page: number;
    size: number;
}

export interface UpdateShipmentStatusRequest {
    status: ShipmentStatus;
    currentLocation: string;
    description: string;
}

export interface CreateShipmentRequest {
    courierName: string;
}
