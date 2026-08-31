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
