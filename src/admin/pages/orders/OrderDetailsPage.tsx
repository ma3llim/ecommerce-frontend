import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Package, CreditCard, MapPin, Truck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrderApi } from "@/admin/api/OrderApi";
import type { OrderStatus } from "@/admin/types/Order.types";
import PageLoader from "@/components/common/PageLoader";
import ButtonWithAlert from "@/admin/components/ButtonWithAlert";

const getNextStatuses = (status: OrderStatus): OrderStatus[] => {
    switch (status) {
        case "PENDING":
            return ["CONFIRMED", "CANCELLED"];

        case "CONFIRMED":
            return ["PACKED", "CANCELLED"];

        case "PACKED":
            return ["SHIPPED"];

        case "SHIPPED":
            return ["DELIVERED"];

        case "DELIVERED":
            return ["RETURNED"];

        case "CANCELLED":
        case "RETURNED":
            return [];

        default:
            return [];
    }
};

const OrderDetailsPage = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: order, isLoading } = useQuery({
        queryKey: ["order", orderId],
        queryFn: () => OrderApi.getOrder(orderId!),
        enabled: !!orderId,
    });

    const { mutate: cancelOrder, isPending: isCancelling } = useMutation({
        mutationFn: () => OrderApi.cancelOrder(orderId!),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["order", orderId],
            });
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
        },
    });

    const { mutate: updateOrderStatus, isPending: isUpdatingStatus } = useMutation({
        mutationFn: (status: OrderStatus) =>
            OrderApi.updateOrderStatus(orderId!, {
                status,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["order", orderId],
            });
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
        },
    });

    if (isLoading) {
        return <PageLoader />;
    }

    if (!order) {
        return (
            <div className="space-y-4">
                <Button type="button" variant="outline" onClick={() => navigate("/admin/orders/order-listing")}>
                    <ArrowLeft className="mr-2 size-4" />
                    Back to Orders
                </Button>

                <Card>
                    <CardContent className="flex min-h-76 items-center justify-center">
                        <p className="text-sm text-muted-foreground">Order not found.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const isProcessing = isCancelling || isUpdatingStatus;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Order Details</h1>
                    <p className="text-sm text-muted-foreground">View and manage order #{order.orderNumber}.</p>
                </div>
                <Button type="button" variant="outline" onClick={() => navigate("/admin/orders/order-listing")}>
                    <ArrowLeft className="mr-2 size-4" />
                    Back to Orders
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="size-5" />
                        Order Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Order Number</p>
                            <p className="font-medium">{order.orderNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Order Status</p>
                            <p className="font-medium">{order.orderStatus}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Payment Status</p>
                            <p className="font-medium">{order.paymentStatus}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Amount</p>
                            <p className="font-medium">₹{order.totalAmount.toFixed(2)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap items-center gap-4">
                        <Select
                            value={order.orderStatus}
                            disabled={isProcessing || order.orderStatus === "CANCELLED" || order.orderStatus === "DELIVERED"}
                            onValueChange={value => updateOrderStatus(value as OrderStatus)}
                        >
                            <SelectTrigger className="w-52">
                                <SelectValue placeholder="Update status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                                <SelectItem value="PROCESSING">Processing</SelectItem>
                                <SelectItem value="SHIPPED">Shipped</SelectItem>
                                <SelectItem value="DELIVERED">Delivered</SelectItem>
                                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>

                        <ButtonWithAlert
                            dialogTitle="Cancel Order?"
                            dialogDesc={`Are you sure you want to cancel order "${order.orderNumber}"? This action cannot be undone.`}
                            dialogActionTitle="Cancel Order"
                            dialogActionfn={() => cancelOrder()}
                            aria-label={`Cancel ${order.orderNumber}`}
                            disabled={isProcessing || order.orderStatus === "CANCELLED" || order.orderStatus === "DELIVERED"}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        {order.items.map(item => (
                            <div key={item.orderItem} className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="font-medium">{item.productName}</p>

                                    <p className="text-sm text-muted-foreground">{item.variantName}</p>
                                </div>

                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Quantity</p>

                                        <p className="font-medium">{item.quantity}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">Unit Price</p>

                                        <p className="font-medium">₹{item.unitPrice.toFixed(2)}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground">Total</p>

                                        <p className="font-medium">₹{item.totalPrice.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="ml-auto max-w-sm space-y-3">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>

                            <span>₹{order.subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>

                            <span>₹{order.shippingAmount.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Discount</span>

                            <span>-₹{order.discountAmount.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Tax</span>

                            <span>₹{order.taxAmount.toFixed(2)}</span>
                        </div>

                        <div className="border-t pt-3">
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>

                                <span>₹{order.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="size-5" />
                        Payment Information
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <p className="text-sm text-muted-foreground">Payment ID</p>

                            <p className="break-all font-medium">{order.payment.paymentId}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Razorpay Order ID</p>

                            <p className="break-all font-medium">{order.payment.razorpayOrderId}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Payment Method</p>

                            <p className="font-medium">{order.payment.paymentMethod}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Payment Status</p>

                            <p className="font-medium">{order.payment.paymentStatus}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">Amount</p>

                            <p className="font-medium">
                                {order.payment.currency} {order.payment.amount.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="size-5" />
                        Shipping Address
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="space-y-1">
                        <p>{order.shippingAddress.addressLine1}</p>

                        {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}

                        <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                        </p>

                        <p>
                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {order.userShipmentResponse && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Truck className="size-5" />
                            Shipment Information
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Courier</p>

                                <p className="font-medium">{order.userShipmentResponse.courierName}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Tracking Number</p>

                                <p className="font-medium">{order.userShipmentResponse.trackingNumber}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Shipment Status</p>

                                <p className="font-medium">{order.userShipmentResponse.shipmentStatus}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Shipped At</p>

                                <p className="font-medium">
                                    {order.userShipmentResponse.shippedAt ? new Date(order.userShipmentResponse.shippedAt).toLocaleString() : "-"}
                                </p>
                            </div>
                        </div>

                        {order.userShipmentResponse.timeline?.length > 0 && (
                            <div className="mt-6 space-y-4">
                                <h3 className="font-medium">Shipment Timeline</h3>

                                {order.userShipmentResponse.timeline.map(event => (
                                    <div key={event.eventId} className="border-l-2 pl-4">
                                        <p className="font-medium">{event.status}</p>

                                        <p className="text-sm text-muted-foreground">{event.description}</p>

                                        <p className="text-xs text-muted-foreground">
                                            {event.location} · {new Date(event.eventTime).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default OrderDetailsPage;
