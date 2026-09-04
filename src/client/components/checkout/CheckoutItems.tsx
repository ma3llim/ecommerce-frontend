import { Link } from "react-router-dom";
import type { CartItem } from "@/client/types/Cart.types";

interface CheckoutItemsProps {
    items: CartItem[];
}

const CheckoutItems = ({ items }: CheckoutItemsProps) => {
    return (
        <section className="rounded-xl border bg-card p-5">
            <div>
                <h2 className="text-xl font-semibold">Order Items</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    {items.length} {items.length === 1 ? "item" : "items"} in your order
                </p>
            </div>

            <div className="mt-5 divide-y">
                {items.map(item => (
                    <div key={item.id} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                        <Link to={`/product-details/${item.productSlug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-muted/30">
                            <img loading="lazy" src={item.productVariantImage} alt={item.productName} className="h-full w-full object-contain p-2" />
                        </Link>
                        <div className="min-w-0 flex-1">
                            <Link to={`/product-details/${item.productSlug}`} className="font-medium transition-colors hover:text-primary">
                                {item.productName}
                            </Link>
                            <p className="mt-1 text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                            <p className="mt-2 text-sm font-medium">₹{item.unitPrice.toLocaleString("en-IN")} each</p>
                        </div>
                        <p className="font-semibold">₹{item.totalPrice.toLocaleString("en-IN")}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CheckoutItems;
