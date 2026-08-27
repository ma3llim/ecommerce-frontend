import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { CreateShipmentRequest, ShipmentFilters, ShipmentListResponse, ShipmentResponse, UpdateShipmentStatusRequest } from "../types/Shipment.types";
import { axiosInstance } from "@/config/axios";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";

export const ShipmentApi = {
    getShipments: async (filters: ShipmentFilters): Promise<ApiResponse<ShipmentListResponse>> => {
        const response = await axiosInstance.get<ApiResponse<ShipmentListResponse>>(ADMIN_ENDPOINTS.SHIPMENTS.GET_SHIPMENTS, {
            params: {
                search: filters.search || undefined,
                shipmentStatus: filters.shipmentStatus || undefined,
                courierName: filters.courierName || undefined,
                from: filters.from || undefined,
                to: filters.to || undefined,
                page: filters.page,
                size: filters.size,
            },
        });

        return response.data;
    },

    getShipmentById: async (shipmentId: string): Promise<ApiResponse<ShipmentResponse>> => {
        const response = await axiosInstance.get<ApiResponse<ShipmentResponse>>(ADMIN_ENDPOINTS.SHIPMENTS.GET_SHIPMENT(shipmentId));
        return response.data;
    },
    updateShipmentStatus: async (shipmentId: string, data: UpdateShipmentStatusRequest): Promise<ApiResponse<ShipmentResponse>> => {
        const response = await axiosInstance.patch<ApiResponse<ShipmentResponse>>(ADMIN_ENDPOINTS.SHIPMENTS.UPDATE_SHIPMENT(shipmentId), data);
        return response.data;
    },
    createShipment: async (orderId: string, data: CreateShipmentRequest): Promise<ApiResponse<ShipmentResponse>> => {
        const response = await axiosInstance.post<ApiResponse<ShipmentResponse>>(ADMIN_ENDPOINTS.SHIPMENTS.CREATE_SHIPMENT(orderId), data);
        return response.data;
    },
};
