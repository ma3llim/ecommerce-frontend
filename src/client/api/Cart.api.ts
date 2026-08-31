import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { AddCartItemRequest, Cart, UpdateCartItemRequest } from "../types/Cart.types";
import { axiosInstance } from "@/config/axios";
import { ENDPOINTS } from "./Api.endpoints";

export const CartApi = {
    getCart: async (): Promise<ApiResponse<Cart>> => {
        const response = await axiosInstance.get<ApiResponse<Cart>>(ENDPOINTS.CART.BASE);
        return response.data;
    },
    addItem: async (values: AddCartItemRequest): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.post<ApiResponse<string>>(ENDPOINTS.CART.ITEMS, values);
        return response.data;
    },
    updateItem: async (itemId: string, values: UpdateCartItemRequest): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.patch<ApiResponse<string>>(`${ENDPOINTS.CART.ITEMS}/${itemId}`, values);
        return response.data;
    },
    deleteItem: async (itemId: string): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.delete<ApiResponse<string>>(`${ENDPOINTS.CART.ITEMS}/${itemId}`);
        return response.data;
    },
    clearCart: async (): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.delete<ApiResponse<string>>(ENDPOINTS.CART.BASE);
        return response.data;
    },
};
