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
import type { ApplyCouponRequest } from "@/client/types/Coupon.types";
import { AddressApi } from "@/client/api/Address.api";
import { OrderApi } from "@/client/api/Order.api";
import type { PaymentMethod } from "@/client/types/Order.types";
import { PaymentApi } from "@/client/api/Payment.api";
import { openRazorpayCheckout } from "@/client/utils/razorpay";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import CheckoutItems from "@/client/components/checkout/CheckoutItems";
import CouponCard from "@/client/components/checkout/CouponCard";
import DeliveryAddress from "@/client/components/checkout/DeliveryAddress";
import OrderSummary from "@/client/components/checkout/OrderSummary";
import { Helmet } from "react-helmet-async";

const Checkout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const user = useSelector((state: RootState) => state.userAuth.user);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
    const [couponResult, setCouponResult] = useState<CouponCodeResponse | null>(null);

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

    const cart = data?.data;
    const items = cart?.items ?? [];
    const addresses = addressResponse?.data ?? [];

    const { mutate: applyCoupon, isPending: isApplyingCoupon } = useMutation({
        mutationFn: CouponApi.applyCoupon,
        onSuccess: response => {
            setCouponResult(response.data);
            ToastService.success(response.message || "Coupon applied successfully.");
        },
        onError: error => {
            setCouponResult(null);

            ToastService.error(error instanceof Error ? error.message : "Failed to apply coupon.");
        },
    });

    const { mutate: initiatePayment, isPending: isInitiatingPayment } = useMutation({
        mutationFn: PaymentApi.initiatePayment,
        onSuccess: async response => {
            try {
                await openRazorpayCheckout({
                    payment: response.data,
                    name: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
                    email: user?.email,
                    phoneNumber: user?.phoneNumber ?? undefined,
                    onSuccess: paymentResponse => {
                        console.log("Razorpay payment success:", paymentResponse);
                        queryClient.invalidateQueries({
                            queryKey: ["cart"],
                        });
                        navigate("/orders");
                    },
                });
            } catch (error) {
                ToastService.error(error instanceof Error ? error.message : "Unable to open payment.");
            }
        },

        onError: error => {
            ToastService.error(error instanceof Error ? error.message : "Failed to initiate payment.");
        },
    });

    const { mutate: createOrder, isPending: isCreatingOrder } = useMutation({
        mutationFn: OrderApi.createOrder,
        onSuccess: response => {
            const { orderId } = response.data;

            if (paymentMethod === "RAZORPAY") {
                initiatePayment(orderId);
                return;
            }

            ToastService.success(response.message || "Order placed successfully.");
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
            navigate(`/orders/${orderId}`);
        },

        onError: error => {
            ToastService.error(error instanceof Error ? error.message : "Failed to place order.");
        },
    });

    const handleApplyCoupon = (values: ApplyCouponRequest) => {
        applyCoupon(values);
    };

    const handlePlaceOrder = () => {
        if (!selectedAddressId) {
            ToastService.error("Please select a delivery address.");
            return;
        }

        createOrder({
            shippingAddressId: selectedAddressId,
            paymentMethod,
            ...(couponResult?.couponCode && {
                couponCode: couponResult.couponCode,
            }),
        });
    };

    const handleAddAddress = () => {
        navigate("/account/addresses");
    };

    if (isLoading) {
        return <PageLoader />;
    }

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

    const isPlacingOrder = isCreatingOrder || isInitiatingPayment;

    return (
        <>
            <Helmet>
                <title>Checkout - Ecommerce</title>
                <meta name="description" content="Complete your order securely through Ecommerce's checkout process." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <Container>
                <main className="w-full py-8 md:py-10">
                    <div>
                        <Link to="/cart">
                            <Button variant="secondary" className="-ml-3">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Cart
                            </Button>
                        </Link>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight">Checkout</h1>
                        <p className="mt-1 text-muted-foreground">Review your order before placing it.</p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
                        <div className="space-y-6">
                            <CheckoutItems items={items} />
                            <CouponCard couponResult={couponResult} isApplyingCoupon={isApplyingCoupon} onApplyCoupon={handleApplyCoupon} />
                            <DeliveryAddress
                                addresses={addresses}
                                selectedAddressId={selectedAddressId}
                                isLoading={isLoadingAddresses}
                                isError={isAddressError}
                                onSelect={setSelectedAddressId}
                                onAddAddress={handleAddAddress}
                            />
                        </div>

                        <OrderSummary
                            cart={cart}
                            items={items}
                            couponResult={couponResult}
                            paymentMethod={paymentMethod}
                            onPaymentMethodChange={setPaymentMethod}
                            onPlaceOrder={handlePlaceOrder}
                            isPlacingOrder={isPlacingOrder}
                            selectedAddressId={selectedAddressId}
                        />
                    </div>
                </main>
            </Container>
        </>
    );
};

export default Checkout;
