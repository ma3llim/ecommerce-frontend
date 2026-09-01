import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, CreditCard, Package, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { OrderListItem } from "@/client/types/Order.types";

interface OrderCardProps {
    order: OrderListItem;
}

const OrderCard = ({ order }: OrderCardProps) => {
    const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <article className="group flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 ease-in-out hover:border-primary hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Order</p>
                        <h2 className="truncate font-semibold">#{order.orderNumber}</h2>
                    </div>
                </div>

                <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                        order.orderStatus === "DELIVERED"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : order.orderStatus === "CANCELLED"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-muted text-muted-foreground"
                    }`}
                >
                    {order.orderStatus}
                </span>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>{formattedDate}</span>
            </div>

            <div className="mt-5 space-y-3 rounded-xl bg-muted/40 p-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Payment</span>
                    <div className="flex items-center gap-1.5 font-medium">
                        <CreditCard className="h-4 w-4" />
                        {order.paymentStatus}
                    </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₹{order.shippingAmount.toLocaleString("en-IN")}</span>
                </div>

                {order.discountAmount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="font-medium text-primary">
                            -₹
                            {order.discountAmount.toLocaleString("en-IN")}
                        </span>
                    </div>
                )}

                {order.couponCode && (
                    <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Tag className="h-4 w-4" />
                            Coupon
                        </span>
                        <span className="truncate font-medium">{order.couponCode}</span>
                    </div>
                )}
            </div>

            <div className="mt-5 flex items-end justify-between border-t pt-5">
                <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="mt-1 text-xl font-bold text-primary">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                </div>

                <Link to={`/orders/${order.orderId}`}>
                    <Button variant="outline" size="lg">
                        View
                        <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Button>
                </Link>
            </div>
        </article>
    );
};

export default OrderCard;
