export interface ProductVariantImage {
    id: string;
    imageUrl: string;
    displayOrder: number;
    primary: boolean;
}

export interface ProductVariant {
    id: string;
    sku: string;
    price: number;
    stockQuantity: number;
    attributes: Record<string, string>;
    active: boolean;
    images: ProductVariantImage[];
}

export interface CreateProductVariantRequest {
    price: number;
    stockQuantity: number;
    attributes: Record<string, string>;
    images?: File[];
}

export interface UpdateProductVariantRequest {
    price: number;
    stockQuantity: number;
    attributes: Record<string, string>;
}

export type VariantStatus = "ACTIVE" | "INACTIVE";

export interface UpdateVariantStatusRequest {
    status: VariantStatus;
}

export type productId = string;

export interface ReorderVariantImagesRequest {
    imageIds: string[];
}

export interface ProductVariantImageResponse {
    id: string;
    imageUrl: string;
    displayOrder: number;
    primary: boolean;
}

export interface ProductVariantResponse {
    id: string;
    sku: string;
    price: number;
    stockQuantity: number;
    attributes: Record<string, string>;
    active: boolean;
    images: ProductVariantImageResponse[];
}
