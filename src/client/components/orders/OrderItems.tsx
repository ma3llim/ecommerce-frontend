import type { OrderItem } from "@/client/types/Order.types";
import { Package } from "lucide-react";

interface OrderItemsProps {
    items: OrderItem[];
}

const OrderItems = ({ items }: OrderItemsProps) => {
    return (
        <section className="rounded-xl border bg-card p-5">
            <h2 className="text-xl font-semibold">Order Items</h2>
            <div className="mt-5 divide-y">
                {items.map(item => (
                    <div key={item.orderItem} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <Package className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold">{item.productName}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{item.variantName}</p>
                            <p className="mt-1 text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold">₹{item.totalPrice.toLocaleString("en-IN")}</p>
                            <p className="mt-1 text-sm text-muted-foreground">₹{item.unitPrice.toLocaleString("en-IN")} each</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OrderItems;
