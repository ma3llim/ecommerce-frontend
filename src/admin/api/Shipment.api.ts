import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { CreateShipmentRequest, ShipmentListParams, ShipmentResponse, UpdateShipmentStatusRequest } from "../types/Shipment.types";
import type { PageResponse } from "@/types/common/PageResponse.types";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";
import { axiosInstance } from "@/config/axios";

export const ShipmentApi = {
    getShipments: async (params: ShipmentListParams): Promise<ApiResponse<PageResponse<ShipmentResponse>>> => {
        const response = await axiosInstance.get<ApiResponse<PageResponse<ShipmentResponse>>>(ADMIN_ENDPOINTS.SHIPMENT.GET_ALL, {
            params,
        });
        return response.data;
    },
    getShipment: async (shipmentId: string): Promise<ShipmentResponse> => {
        const response = await axiosInstance.get<ApiResponse<ShipmentResponse>>(ADMIN_ENDPOINTS.SHIPMENT.GET_BY_ID(shipmentId));
        return response.data.data;
    },
    updateShipmentStatus: async (shipmentId: string, data: UpdateShipmentStatusRequest): Promise<ShipmentResponse> => {
        const response = await axiosInstance.patch<ApiResponse<ShipmentResponse>>(ADMIN_ENDPOINTS.SHIPMENT.UPDATE_STATUS(shipmentId), data);
        return response.data.data;
    },
    createShipment: async (orderId: string, data: CreateShipmentRequest): Promise<ShipmentResponse> => {
        const response = await axiosInstance.post<ApiResponse<ShipmentResponse>>(ADMIN_ENDPOINTS.SHIPMENT.CREATE(orderId), data);
        return response.data.data;
    },
};
