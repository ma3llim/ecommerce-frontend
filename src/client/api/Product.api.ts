import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { searchProduct } from "../types/Product.types";
import { axiosInstance } from "@/config/axios";
import { ENDPOINTS } from "./Api.endpoints";
import type { PageResponse } from "@/types/common/PageResponse.types";

export const ProductApi = {
    search: async (keyword: string): Promise<ApiResponse<PageResponse<searchProduct>>> => {
        const repsonse = await axiosInstance.get(ENDPOINTS.SEARCH(keyword));
        return repsonse.data;
    },
};
