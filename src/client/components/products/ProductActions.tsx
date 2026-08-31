import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductActionsProps {
    stockQuantity: number;
    isPending?: boolean;
    onAddToCart: () => void;
}

const ProductActions = ({ stockQuantity, isPending = false, onAddToCart }: ProductActionsProps) => {
    const outOfStock = stockQuantity <= 0;

    return (
        <Button type="button" size="lg" className="w-full sm:w-auto" disabled={outOfStock || isPending} onClick={onAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            {outOfStock ? "Out of Stock" : isPending ? "Adding..." : "Add to Cart"}
        </Button>
    );
};

export default ProductActions;
