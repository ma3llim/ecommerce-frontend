import type { OrderDetail } from "@/client/types/Order.types";

interface PaymentDetailsProps {
    order: OrderDetail;
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
    return (
        <section className="rounded-xl border bg-card p-5">
            <h2 className="text-xl font-semibold">Payment Details</h2>
            <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Method</span>
                    <span className="font-medium">{order.payment.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">{order.payment.paymentStatus}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>

                    <span className="font-medium">₹{order.payment.amount.toLocaleString("en-IN")}</span>
                </div>
            </div>
        </section>
    );
};

export default PaymentDetails;
