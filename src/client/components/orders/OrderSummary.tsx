import type { OrderDetail } from "@/client/types/Order.types";

interface OrderSummaryProps {
    order: OrderDetail;
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
    return (
        <section className="rounded-xl border bg-card p-5">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="mt-5 space-y-4">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>

                    <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>

                    <span>₹{order.shippingAmount.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>

                    <span className="text-primary">
                        -₹
                        {order.discountAmount.toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>

                    <span>₹{order.taxAmount.toLocaleString("en-IN")}</span>
                </div>

                <div className="border-t pt-4">
                    <div className="flex justify-between">
                        <span className="font-semibold">Total</span>

                        <span className="text-xl font-bold text-primary">₹{order.totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderSummary;
