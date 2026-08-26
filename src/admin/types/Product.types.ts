import type { ApiResponse } from "@/types/common/ApiResponse.types";

export interface Product {
    id: string;
    categoryId: string;
    categoryName: string;
    name: string;
    specifications: Record<string, string>;
    published: boolean;
    createdAt: string;
}

export interface SpecificationField {
    key: string;
    value: string;
}

export interface AddProductRequest {
    categoryId: string;
    name: string;
    description: string;
    specifications: Record<string, string>;
}

export type AddProductResponse = ApiResponse<Product>;
