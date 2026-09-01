import type { ProductDetails, ProductVariant } from "@/client/types/Product.types";

import ProductVariants from "./ProductVariants";
import ProductQuantity from "./ProductQuantity";
import ProductActions from "./ProductActions";

interface ProductInfoProps {
    product: ProductDetails;
    selectedVariant: ProductVariant;
    quantity: number;
    isPending?: boolean;
    onSelectVariant: (variant: ProductVariant) => void;
    onQuantityChange: (quantity: number) => void;
    onAddToCart: () => void;
}

const ProductInfo = ({ product, selectedVariant, quantity, isPending, onSelectVariant, onQuantityChange, onAddToCart }: ProductInfoProps) => {
    const stockQuantity = selectedVariant.stockQuantity;
    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
                {stockQuantity > 0 ? (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">In Stock</span>
                ) : (
                    <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">Out of Stock</span>
                )}
            </div>
            <div className="mt-5">
                <p className="text-3xl font-bold">₹{selectedVariant.price != null ? selectedVariant.price.toLocaleString("en-IN") : "Price unavailable"}</p>
            </div>
            <div className="my-6 h-px bg-border" />
            <div>
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="mt-2 leading-7 text-muted-foreground">{product.description}</p>
            </div>
            {product.variants.length > 1 && (
                <>
                    <div className="my-6 h-px bg-border" />
                    <ProductVariants variants={product.variants} selectedVariant={selectedVariant} onSelectVariant={onSelectVariant} />
                </>
            )}
            <div className="my-6 h-px bg-border" />
            <ProductQuantity quantity={quantity} stockQuantity={stockQuantity} onChange={onQuantityChange} />
            <div className="mt-5">
                <ProductActions stockQuantity={stockQuantity} isPending={isPending} onAddToCart={onAddToCart} />
            </div>
        </div>
    );
};

export default ProductInfo;
