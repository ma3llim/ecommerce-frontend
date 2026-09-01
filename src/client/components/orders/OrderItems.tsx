import type { OrderItem } from "@/client/types/Order.types";

interface OrderItemsProps {
    items: OrderItem[];
}

const OrderItems = ({ items }: OrderItemsProps) => {
    return (
        <section className="rounded-xl border bg-card p-5">
            <h2 className="text-xl font-semibold">Order Items</h2>
            <div className="mt-5 divide-y">
                {items.map(item => (
                    <div key={item.orderItem} className="flex gap-4 border-b py-5 first:pt-0 last:border-b-0 last:pb-0">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border">
                            <img src={item.imageUrl} alt={item.productName} className="h-full w-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="line-clamp-2 font-semibold">{item.productName}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{item.variantName}</p>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Qty: <span className="font-medium text-foreground">{item.quantity}</span>
                            </p>
                        </div>
                        <div className="shrink-0 text-right">
                            <p className="font-semibold">₹{item.totalPrice.toLocaleString("en-IN")}</p>
                            <p className="mt-1 text-xs text-muted-foreground">₹{item.unitPrice.toLocaleString("en-IN")} each</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OrderItems;
