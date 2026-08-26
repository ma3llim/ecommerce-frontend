import type { ApiResponse } from "@/types/common/ApiResponse.types";

export interface Product {
    id: string;
    categoryId: string;
    categoryName: string;
    name: string;
    description: string;
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

export interface UpdateProductRequest {
    categoryId: string;
    name: string;
    description: string;
    specifications: Record<string, string>;
}

export type ProductStatus = "ACTIVE" | "INACTIVE";

export interface UpdateProductStatusRequest {
    status: ProductStatus;
}

export type AddProductResponse = ApiResponse<Product>;

export interface ProductDetailCategory {
    id: string;
    name: string;
}

export interface ProductDetail {
    id: string;
    category: ProductDetailCategory;
    name: string;
    slug: string;
    description: string;
    specifications: Record<string, string>;
    defaultVariantId: string | null;
    active: boolean;
    variants: ProductVariant[];
    createdAt: string;
}

export interface ProductVariant {
    id: string;
}
