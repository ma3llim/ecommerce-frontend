import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartApi } from "@/client/api/Cart.api";
import Container from "@/client/components/Container";
import PageLoader from "@/components/common/PageLoader";
import type { CouponCodeResponse } from "@/client/types/Cart.types";
import { useState } from "react";
import { CouponApi } from "@/client/api/Coupon.api";
import ToastService from "@/services/ToastService";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import type { ApplyCouponRequest } from "@/client/types/Coupon.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { couponSchema } from "@/client/validation/CouponSchema";
import { AddressApi } from "@/client/api/Address.api";
import { OrderApi } from "@/client/api/Order.api";
import type { PaymentMethod } from "@/client/types/Order.types";

const Checkout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ApplyCouponRequest>({
        resolver: yupResolver(couponSchema),
        defaultValues: {
            code: "",
        },
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["cart"],
        queryFn: CartApi.getCart,
    });

    const {
        data: addressResponse,
        isLoading: isLoadingAddresses,
        isError: isAddressError,
    } = useQuery({
        queryKey: ["user-addresses"],
        queryFn: AddressApi.getAddresses,
    });

    const addresses = addressResponse?.data ?? [];

    const [couponResult, setCouponResult] = useState<CouponCodeResponse | null>(null);
    const cart = data?.data;
    const items = cart?.items ?? [];

    const { mutate: applyCoupon, isPending: isApplyingCoupon } = useMutation({
        mutationFn: CouponApi.applyCoupon,
        onSuccess: response => {
            setCouponResult(response.data);
            ToastService.success(response.message || "Coupon applied successfully.");
        },

        onError: error => {
            setCouponResult(null);
            ToastService.error(error.message);
        },
    });

    const { mutate: createOrder, isPending: isCreatingOrder } = useMutation({
        mutationFn: OrderApi.createOrder,
        onSuccess: response => {
            ToastService.success(response.message || "Order placed successfully.");

            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
            navigate(`/orders/${response.data.orderId}`);
        },
        onError: error => {
            ToastService.error(error instanceof Error ? error.message : "Failed to place order.");
        },
    });

    const handlePlaceOrder = () => {
        if (!selectedAddressId) {
            ToastService.error("Please select a delivery address.");

            return;
        }

        createOrder({
            shippingAddressId: selectedAddressId,
            paymentMethod: "COD",
            ...(couponResult?.couponCode && {
                couponCode: couponResult.couponCode,
            }),
        });
    };

    if (isError) {
        return (
            <Container>
                <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                    <h1 className="text-2xl font-bold">Unable to load checkout</h1>
                    <p className="mt-2 text-muted-foreground">Something went wrong while loading your cart.</p>
                    <Button className="mt-5">
                        <Link to="/cart">Back to Cart</Link>
                    </Button>
                </div>
            </Container>
        );
    }

    if (!items.length) {
        return (
            <Container>
                <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    <h1 className="mt-5 text-2xl font-bold">Your cart is empty</h1>
                    <p className="mt-2 text-muted-foreground">Add some products before proceeding to checkout.</p>
                    <Button className="mt-5">
                        <Link to="/products">Continue Shopping</Link>
                    </Button>
                </div>
            </Container>
        );
    }

    const onApplyCoupon = (values: ApplyCouponRequest) => {
        applyCoupon(values);
    };

    const shippingAmount = 40;
    const subtotal = couponResult?.subtotal ?? cart?.totalAmount ?? 0;
    const discount = couponResult?.discountAmount ?? 0;
    const total = couponResult?.totalAmount ?? cart?.totalAmount ?? 0;
    const displayTotal = total + shippingAmount;
    return (
        <>
            {isLoading ? (
                <PageLoader />
            ) : (
                <Container>
                    <main className="w-full py-8 md:py-10">
                        <div>
                            <Button variant="ghost" className="-ml-3">
                                <Link to="/cart">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Cart
                                </Link>
                            </Button>

                            <h1 className="mt-4 text-3xl font-bold tracking-tight">Checkout</h1>

                            <p className="mt-1 text-muted-foreground">Review your order before placing it.</p>
                        </div>
                        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
                            <div className="space-y-6">
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
                                                <Link
                                                    to={`/product-details/${item.productSlug}`}
                                                    className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-muted/30"
                                                >
                                                    <img src={item.productVariantImage} alt={item.productName} className="h-full w-full object-contain p-2" />
                                                </Link>
                                                <div className="min-w-0 flex-1">
                                                    <Link
                                                        to={`/product-details/${item.productSlug}`}
                                                        className="font-medium transition-colors hover:text-primary"
                                                    >
                                                        {item.productName}
                                                    </Link>
                                                    <p className="mt-1 text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                                    <p className="mt-2 text-sm font-medium">₹{item.unitPrice.toLocaleString()} each</p>
                                                </div>
                                                <p className="font-semibold">₹{item.totalPrice.toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="rounded-xl border bg-card p-5">
                                    <h2 className="text-xl font-semibold">Coupon</h2>

                                    <p className="mt-1 text-sm text-muted-foreground">Have a coupon code? Apply it here.</p>

                                    <form onSubmit={handleSubmit(onApplyCoupon)} className="mt-4">
                                        <div className="flex gap-2">
                                            <Input
                                                {...register("code")}
                                                placeholder="Enter coupon code"
                                                disabled={isApplyingCoupon || !!couponResult}
                                                className="uppercase"
                                            />
                                            <Button type="submit" disabled={isApplyingCoupon || !!couponResult}>
                                                {isApplyingCoupon ? "Applying..." : couponResult ? "Applied" : "Apply"}
                                            </Button>
                                        </div>

                                        {errors.code && <p className="mt-2 text-sm text-destructive">{errors.code.message}</p>}
                                    </form>
                                </section>
                                <section className="rounded-xl border bg-card p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-semibold">Delivery Address</h2>

                                            <p className="mt-1 text-sm text-muted-foreground">Select an address for delivery.</p>
                                        </div>
                                    </div>

                                    {isLoadingAddresses ? (
                                        <PageLoader />
                                    ) : isAddressError ? (
                                        <div className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 p-5">
                                            <p className="text-sm text-destructive">Unable to load your addresses.</p>
                                        </div>
                                    ) : addresses.length === 0 ? (
                                        <div className="mt-5 rounded-lg border border-dashed p-6 text-center">
                                            <p className="font-medium">No saved addresses</p>

                                            <p className="mt-1 text-sm text-muted-foreground">Add a delivery address to continue.</p>

                                            <Button type="button" className="mt-4" onClick={() => navigate("/account/addresses")}>
                                                Add Address
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="mt-5 grid gap-4">
                                            {addresses.map(address => {
                                                const isSelected = selectedAddressId === address.id;

                                                return (
                                                    <button
                                                        key={address.id}
                                                        type="button"
                                                        onClick={() => setSelectedAddressId(address.id)}
                                                        className={`w-full rounded-xl border p-4 text-left transition-colors duration-200 ${
                                                            isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                                        }`}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div
                                                                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                                                    isSelected ? "border-primary" : "border-muted-foreground"
                                                                }`}
                                                            >
                                                                {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                                                            </div>

                                                            <div className="min-w-0 flex-1">
                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    <p className="font-semibold">{address.fullName}</p>

                                                                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                                                                        {address.addressType}
                                                                    </span>

                                                                    {address.defaultShipping && (
                                                                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                                                                            Default
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                                                    {address.addressLineOne}
                                                                    {address.addressLineTwo && `, ${address.addressLineTwo}`}
                                                                    <br />
                                                                    {address.city}, {address.state} {address.postalCode}
                                                                    <br />
                                                                    {address.country}
                                                                </p>

                                                                <p className="mt-2 text-sm font-medium">{address.phoneNumber}</p>
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </section>
                            </div>

                            <aside className="h-fit rounded-xl border bg-card p-5 shadow-sm lg:sticky lg:top-6">
                                <h2 className="text-xl font-semibold">Order Summary</h2>

                                <div className="mt-6 space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Items</span>

                                        <span>{items.reduce((total, item) => total + item.quantity, 0)}</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>

                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>

                                    {couponResult && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Discount ({couponResult.couponCode})</span>

                                            <span className="font-medium text-primary">
                                                -₹
                                                {discount.toLocaleString()}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping (40%)</span>

                                        <span>₹{shippingAmount.toLocaleString()}</span>
                                    </div>

                                    <div className="h-px bg-border" />

                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Total</span>
                                        <span className="text-xl font-bold text-primary">₹{displayTotal.toLocaleString()}</span>
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold">Select Payment Method</h2>
                                        <div className="mt-4 space-y-4">
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod("COD")}
                                                className={`flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-all duration-200 ${
                                                    paymentMethod === "COD" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                                }`}
                                            >
                                                <div
                                                    className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                                                        paymentMethod === "COD" ? "border-primary" : "border-muted-foreground"
                                                    }`}
                                                >
                                                    {paymentMethod === "COD" && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                                                </div>

                                                <div>
                                                    <p className="font-semibold">Cash On Delivery</p>

                                                    <p className="mt-1 text-sm text-muted-foreground">Pay with cash when you receive the order</p>
                                                </div>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod("RAZORPAY")}
                                                className={`flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-all duration-200 ${
                                                    paymentMethod === "RAZORPAY" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                                }`}
                                            >
                                                <div
                                                    className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                                                        paymentMethod === "RAZORPAY" ? "border-primary" : "border-muted-foreground"
                                                    }`}
                                                >
                                                    {paymentMethod === "RAZORPAY" && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                                                </div>

                                                <div>
                                                    <p className="font-semibold">Pay Now</p>

                                                    <p className="mt-1 text-sm text-muted-foreground">Secure online payment using a credit/debit card</p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        size="lg"
                                        className="mt-6 w-full"
                                        disabled={isCreatingOrder || !selectedAddressId}
                                        onClick={handlePlaceOrder}
                                    >
                                        {isCreatingOrder ? "Placing Order..." : "Place Order"}
                                    </Button>
                                </div>
                            </aside>
                        </div>
                    </main>
                </Container>
            )}
        </>
    );
};

export default Checkout;
