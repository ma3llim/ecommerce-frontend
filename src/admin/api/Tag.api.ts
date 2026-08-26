import type { ApiResponse } from "@/types/common/ApiResponse.types";
import type { PageResponse } from "@/types/common/PageResponse.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import type { AddTagRequest, Tag, TagOptionResponse, UpdateTagRequest } from "../types/Tag.types";
import { axiosInstance } from "@/config/axios";
import { ADMIN_ENDPOINTS } from "./Admin.endpoints";

export const TagApi = {
    getTags: async (pagination: PaginationRequest, search?: string): Promise<ApiResponse<PageResponse<Tag>>> => {
        const response = await axiosInstance.get(ADMIN_ENDPOINTS.TAGS.GET_ALL, {
            params: {
                page: pagination.page,
                size: pagination.size,
                ...(search ? { search } : {}),
            },
        });
        return response.data;
    },
    addTag: async (data: AddTagRequest): Promise<ApiResponse<Tag>> => {
        const response = await axiosInstance.post(ADMIN_ENDPOINTS.TAGS.CREATE, data);
        return response.data;
    },
    updateTag: async (tagId: string, data: UpdateTagRequest): Promise<ApiResponse<Tag>> => {
        const response = await axiosInstance.put(ADMIN_ENDPOINTS.TAGS.UPDATE(tagId), data);
        return response.data;
    },
    deleteTag: async (tagId: string): Promise<ApiResponse<string>> => {
        const response = await axiosInstance.delete(ADMIN_ENDPOINTS.TAGS.DELETE(tagId));
        return response.data;
    },
    getTagById: async (tagId: string): Promise<ApiResponse<Tag>> => {
        const response = await axiosInstance.get(ADMIN_ENDPOINTS.TAGS.GET_BY_ID(tagId));
        return response.data;
    },
    getTagOptions: async (params: PaginationRequest): Promise<ApiResponse<PageResponse<TagOptionResponse>>> => {
        const response = await axiosInstance.get(ADMIN_ENDPOINTS.TAGS.GET_OPTIONS, { params });
        return response.data;
    },
};
