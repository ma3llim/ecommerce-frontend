import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { Address, CreateAddressRequest, UpdateAddressRequest } from "../types/Address.types";
import { axiosInstance } from "@/config/axios";
import { ENDPOINTS } from "./Api.endpoints";

export const AddressApi = {
    getAddresses: async (): Promise<ApiResponse<Address[]>> => {
        const response = await axiosInstance.get<ApiResponse<Address[]>>(ENDPOINTS.ADDRESS.BASE);
        return response.data;
    },
    createAddress: async (values: CreateAddressRequest): Promise<ApiResponse<Address>> => {
        const response = await axiosInstance.post<ApiResponse<Address>>(ENDPOINTS.ADDRESS.BASE, values);
        return response.data;
    },
    updateAddress: async ({ addressId, values }: { addressId: string; values: UpdateAddressRequest }): Promise<ApiResponse<Address>> => {
        const response = await axiosInstance.put<ApiResponse<Address>>(ENDPOINTS.ADDRESS.BY_ID(addressId), values);
        return response.data;
    },
    deleteAddress: async (addressId: string): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.delete<ApiResponse<string>>(ENDPOINTS.ADDRESS.BY_ID(addressId));
        return response.data;
    },
    setDefaultBilling: async (addressId: string): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.patch<ApiResponse<string>>(ENDPOINTS.ADDRESS.DEFAULT_BILLING(addressId));
        return response.data;
    },
    setDefaultShipping: async (addressId: string): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.patch<ApiResponse<string>>(ENDPOINTS.ADDRESS.DEFAULT_SHIPPING(addressId));
        return response.data;
    },
};
