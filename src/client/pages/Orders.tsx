import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/client/components/Container";
import PageLoader from "@/components/common/PageLoader";
import { OrderApi } from "@/client/api/Order.api";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import OrderCard from "../components/orders/OrderCard";
import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import bannerImage from "@/assets/banners/basket_banner.webp";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const Orders = () => {
    const [pagination, setPagination] = useState<PaginationRequest>({ page: 0, size: 12 });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["orders", pagination],
        queryFn: () => OrderApi.getOrders({ pagination }),
    });

    const orderPage = data?.data;
    const orders = orderPage?.content ?? [];

    if (isError) {
        return (
            <Container>
                <div className="flex min-h-96 flex-col items-center justify-center text-center">
                    <h1 className="text-2xl font-bold">Unable to load orders</h1>
                    <p className="mt-2 text-muted-foreground">Something went wrong while loading your orders.</p>
                </div>
            </Container>
        );
    }

    return (
        <>
            <Helmet>
                <title>Order - E-Commerce</title>
                <meta name="description" content={`View details for your all order on E-Commerce.`} />
                <meta name="robots" content="noindex, follow" />
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
                            <BreadcrumbPage className="text-white">Orders</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Banner>
            <Container>
                <main className="w-full py-8 md:py-10">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
                                <p className="mt-1 text-muted-foreground">View and manage your orders.</p>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <PageLoader />
                    ) : !orders.length ? (
                        <section className="mt-10 flex min-h-105 flex-col items-center justify-center rounded-2xl border bg-card px-6 text-center shadow-sm">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                <Package className="h-8 w-8 text-muted-foreground" />
                            </div>

                            <h2 className="mt-5 text-xl font-semibold">No orders yet</h2>

                            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                                You haven't placed any orders yet. Start shopping and your orders will appear here.
                            </p>

                            <Button className="mt-6">
                                <Link to="/products">Start Shopping</Link>
                            </Button>
                        </section>
                    ) : (
                        <section className="mt-8">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {orders.map(order => (
                                    <OrderCard key={order.orderId} order={order} />
                                ))}
                            </div>

                            {orderPage && orderPage.totalPages > 1 && (
                                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
                                    <p className="text-sm text-muted-foreground">
                                        Page <span className="font-medium text-foreground">{(orderPage?.page ?? 0) + 1}</span> of{" "}
                                        <span className="font-medium text-foreground">{orderPage?.totalPages ?? 0}</span>
                                    </p>

                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={orderPage?.first ?? true}
                                            onClick={() =>
                                                setPagination(prev => ({
                                                    ...prev,
                                                    page: Math.max(0, prev.page - 1),
                                                }))
                                            }
                                        >
                                            <ChevronLeft className="mr-1 h-4 w-4" />
                                            Previous
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={orderPage?.last ?? true}
                                            onClick={() =>
                                                setPagination(prev => ({
                                                    ...prev,
                                                    page: prev.page + 1,
                                                }))
                                            }
                                        >
                                            Next
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </section>
                    )}
                </main>
            </Container>
        </>
    );
};

export default Orders;
