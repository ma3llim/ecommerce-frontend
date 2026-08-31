import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductCardProps } from "@/client/types/Product.types";

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
    return (
        <Link
            to={`/product-details/${product.slug}`}
            className="group flex h-full w-full select-none flex-col overflow-hidden rounded-lg border-2 border-border bg-card p-0.5 transition-[border-color,box-shadow] duration-300 ease-in-out hover:border-primary hover:shadow-md"
        >
            <div className="relative block h-64 w-full overflow-hidden rounded-md bg-muted/30">
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full rounded-md object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h2 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary">{product.name}</h2>
                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">{product.description}</p>
                <div className="mt-4">
                    <p className="text-xl font-bold text-primary">
                        {product.price != null ? `₹${product.price.toLocaleString("en-IN")}` : "Price unavailable"}
                    </p>
                </div>
                <div className="mt-auto pt-5">
                    <Button
                        type="button"
                        className="w-full"
                        onClick={event => {
                            event.preventDefault();
                            event.stopPropagation();
                            onAddToCart(product);
                        }}
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
