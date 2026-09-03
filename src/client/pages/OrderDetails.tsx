import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/client/components/Container";
import PageLoader from "@/components/common/PageLoader";
import { OrderApi } from "@/client/api/Order.api";
import CancelOrderButton from "../components/orders/CancelOrderButton";
import OrderHeader from "../components/orders/OrderHeader";
import OrderItems from "../components/orders/OrderItems";
import ShippingAddress from "../components/orders/ShippingAddress";
import PaymentDetails from "../components/orders/PaymentDetails";
import ShipmentTimeline from "../components/orders/ShipmentTimeline";
import OrderSummary from "../components/orders/OrderSummary";
import bannerImage from "@/assets/banners/basket_banner.webp";
import Banner from "../components/Banner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const OrderDetails = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["order", orderId],
        queryFn: () => {
            if (!orderId) {
                throw new Error("Order ID is required");
            }

            return OrderApi.getOrderDetails(orderId);
        },
        enabled: !!orderId,
    });

    return (
        <>
            <Helmet>
                <title>Order Details | E-Commerce</title>
                <meta name="description" content="View your order details, items, payment information, shipping address, and order status." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <Banner title="Products" image={bannerImage}>
                <Breadcrumb>
                    <BreadcrumbList className="text-lg">
                        <BreadcrumbItem>
                            <Link to="/" className="text-white/70 transition-colors hover:text-white dark:text-white/80 dark:hover:text-white">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link to="/orders">Orders</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white">Order Details</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Banner>
            <Container>
                {isLoading ? (
                    <PageLoader />
                ) : isError || !data?.data ? (
                    <div className="flex min-h-96 flex-col items-center justify-center text-center">
                        <h1 className="text-2xl font-bold">Order not found</h1>
                        <p className="mt-2 text-muted-foreground">We couldn't load this order.</p>
                        <Button className="mt-5">
                            <Link to="/orders">Back to Orders</Link>
                        </Button>
                    </div>
                ) : (
                    <main className="w-full py-8 md:py-10">
                        {(() => {
                            const order = data.data;
                            const canCancel = order.orderStatus === "PENDING" || order.orderStatus === "CONFIRMED";
                            return (
                                <>
                                    <div className="mt-6 space-y-5">
                                        <Button variant="secondary" size="sm" className="-ml-3" onClick={() => navigate("/orders")}>
                                            <ArrowLeft className="mr-2 h-4 w-4" />
                                            Back to Orders
                                        </Button>
                                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                                            <OrderHeader orderNumber={order.orderNumber} orderStatus={order.orderStatus} paymentStatus={order.paymentStatus} />
                                            {canCancel && <CancelOrderButton orderId={order.orderId} />}
                                        </div>
                                    </div>
                                    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                                        <div className="space-y-6">
                                            <OrderItems items={order.items} canReview={order.orderStatus === "DELIVERED"} />
                                            <ShipmentTimeline shipment={order.userShipmentResponse} />
                                            <ShippingAddress address={order.shippingAddress} />
                                            <PaymentDetails order={order} />
                                        </div>
                                        <OrderSummary order={order} />
                                    </div>
                                </>
                            );
                        })()}
                    </main>
                )}
            </Container>
        </>
    );
};

export default OrderDetails;
