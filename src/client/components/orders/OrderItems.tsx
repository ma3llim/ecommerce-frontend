import type { OrderItem } from "@/client/types/Order.types";
import OrderItemCard from "./OrderItemCard";

interface OrderItemsProps {
    items: OrderItem[];
    canReview: boolean;
}

const OrderItems = ({ items, canReview }: OrderItemsProps) => {
    return (
        <section className="rounded-xl border bg-card p-5">
            <h2 className="text-xl font-semibold">Order Items</h2>

            <div className="mt-5">
                {items.map(item => (
                    <OrderItemCard key={item.orderItem} item={item} canReview={canReview} />
                ))}
            </div>
        </section>
    );
};

export default OrderItems;
