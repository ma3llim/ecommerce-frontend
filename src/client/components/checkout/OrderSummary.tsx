import { Button } from "@/components/ui/button";
import type { Cart, CartItem, CouponCodeResponse } from "@/client/types/Cart.types";
import type { PaymentMethod } from "@/client/types/Order.types";
import PaymentMethodSelector from "./PaymentMethod";

interface OrderSummaryProps {
    cart?: Cart;
    items: CartItem[];
    couponResult: CouponCodeResponse | null;
    paymentMethod: PaymentMethod;
    onPaymentMethodChange: (method: PaymentMethod) => void;
    onPlaceOrder: () => void;
    isPlacingOrder: boolean;
    selectedAddressId: string | null;
}

const OrderSummary = ({
    cart,
    items,
    couponResult,
    paymentMethod,
    onPaymentMethodChange,
    onPlaceOrder,
    isPlacingOrder,
    selectedAddressId,
}: OrderSummaryProps) => {
    const shippingAmount = 40;
    const subtotal = couponResult?.subtotal ?? cart?.totalAmount ?? 0;
    const discount = couponResult?.discountAmount ?? 0;
    const total = couponResult?.totalAmount ?? cart?.totalAmount ?? 0;
    const displayTotal = total + shippingAmount;
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <aside className="h-fit rounded-xl border bg-card p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items</span>
                    <span>{itemCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {couponResult && (
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Discount ({couponResult.couponCode})</span>
                        <span className="font-medium text-primary">-₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                )}
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping (40%)</span>
                    <span>₹{shippingAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary">₹{displayTotal.toLocaleString("en-IN")}</span>
                </div>
                <PaymentMethodSelector value={paymentMethod} onChange={onPaymentMethodChange} />
                <Button type="button" size="lg" className="mt-6 w-full" disabled={isPlacingOrder || !selectedAddressId} onClick={onPlaceOrder}>
                    {isPlacingOrder ? "Processing..." : paymentMethod === "RAZORPAY" ? "Pay Now" : "Place Order"}
                </Button>
            </div>
        </aside>
    );
};

export default OrderSummary;
