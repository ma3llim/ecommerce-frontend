export interface searchProduct {
    productId: string;
    name: string;
    slug: string;
}

export interface Product {
    productId: string;
    name: string;
    description: string;
    slug: string;
    price: number;
    image: string;
}

export interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export interface ProductVariant {
    productVariantId: string;
    sku: string;
    price: number | null;
    stockQuantity: number;
    attributes: Record<string, string>;
    images: ProductVariantImage[];
}

export interface ProductVariantImage {
    productVariantImageId: string;
    url: string;
    displayOrder: number;
    primary: boolean;
}

export interface ProductFaq {
    productFaqId: string;
    question: string;
    answer: string;
}

export interface ProductGalleryProps {
    images: ProductVariantImage[];
}

export interface ProductDetails {
    productId: string;
    name: string;
    slug: string;
    description: string;
    specifications: Record<string, string>;
    defaultVariantId: string;
    variants: ProductVariant[];
    faqs: ProductFaq[];
}

export interface ProductVariant {
    productVariantId: string;
    sku: string;
    price: number | null;
    stockQuantity: number;
    attributes: Record<string, string>;
    images: ProductVariantImage[];
}

export interface ProductVariantImage {
    productVariantImageId: string;
    url: string;
    displayOrder: number;
    primary: boolean;
}

export interface ProductFaq {
    productFaqId: string;
    question: string;
    answer: string;
}
