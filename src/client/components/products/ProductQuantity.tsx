import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductQuantityProps {
    quantity: number;
    stockQuantity: number;
    onChange: (quantity: number) => void;
}

const ProductQuantity = ({ quantity, stockQuantity, onChange }: ProductQuantityProps) => {
    const outOfStock = stockQuantity <= 0;
    return (
        <div className="flex items-center gap-4">
            <p className="text-sm font-semibold">Quantity</p>
            <div className="flex items-center overflow-hidden rounded-lg border">
                <Button type="button" size="icon" variant="ghost" disabled={outOfStock || quantity <= 1} onClick={() => onChange(quantity - 1)}>
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="min-w-10 text-center text-sm font-semibold">{quantity}</span>
                <Button type="button" size="icon" variant="ghost" disabled={outOfStock || quantity >= stockQuantity} onClick={() => onChange(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default ProductQuantity;
