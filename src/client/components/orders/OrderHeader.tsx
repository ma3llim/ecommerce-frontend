import type { OrderStatus, PaymentStatus } from "@/client/types/Order.types";

interface OrderHeaderProps {
    orderNumber: string;
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
}

const OrderHeader = ({ orderNumber, orderStatus, paymentStatus }: OrderHeaderProps) => {
    return (
        <div>
            <p className="text-sm text-muted-foreground">Order</p>
            <h1 className="mt-1 text-3xl font-bold">#{orderNumber}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium">{orderStatus}</span>
                {orderStatus !== "CANCELLED" && <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium">Payment: {paymentStatus}</span>}
            </div>
        </div>
    );
};

export default OrderHeader;
