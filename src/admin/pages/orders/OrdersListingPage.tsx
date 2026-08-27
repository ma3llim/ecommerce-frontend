import { OrderApi } from "@/admin/api/OrderApi";
import ButtonWithAlert from "@/admin/components/ButtonWithAlert";
import { DataTable, DataTableRowActions } from "@/admin/components/table";
import type { OrderListResponse, OrderStatus, PaymentStatus } from "@/admin/types/Order.types";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrdersListingPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [pagination, setPagination] = useState<PaginationRequest>({ page: 0, size: 10 });
    const [search, setSearch] = useState("");
    const [orderStatus, setOrderStatus] = useState<OrderStatus | "">("");
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | "">("");
    const [searchInput, setSearchInput] = useState("");

    const { data, isLoading, error } = useQuery({
        queryKey: ["orders", pagination.page, pagination.size, search, orderStatus, paymentStatus],

        queryFn: () =>
            OrderApi.getOrders({
                page: pagination.page,
                size: pagination.size,
                search: search || undefined,
                orderStatus: orderStatus || undefined,
                paymentStatus: paymentStatus || undefined,
            }),
    });

    const { mutate: cancelOrder, isPending: isCancelling } = useMutation({
        mutationFn: (orderId: string) => OrderApi.cancelOrder(orderId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
        },
    });

    const columns: ColumnDef<OrderListResponse>[] = [
        {
            accessorKey: "orderNumber",
            header: "Order Number",
        },
        {
            accessorKey: "totalAmount",
            header: "Total",
            cell: ({ row }) => <span className="font-medium">₹{row.original.totalAmount.toFixed(2)}</span>,
        },
        {
            accessorKey: "paymentStatus",
            header: "Payment Status",
            cell: ({ row }) => <span className="font-medium">{row.original.paymentStatus}</span>,
        },
        {
            accessorKey: "orderStatus",
            header: "Order Status",
            cell: ({ row }) => <span className="font-medium">{row.original.orderStatus}</span>,
        },
        {
            accessorKey: "couponCode",
            header: "Coupon",
            cell: ({ row }) => row.original.couponCode || "-",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const order = row.original;
                const canCancel = order.orderStatus !== "CANCELLED" && order.orderStatus !== "DELIVERED" && order.orderStatus !== "RETURNED";
                return (
                    <DataTableRowActions
                        actions={[
                            {
                                label: "View",
                                icon: Eye,
                                variant: "info",
                                disabled: isCancelling,
                                onClick: () => navigate(`/admin/orders/order-details/${order.orderId}`),
                            },
                            ...(canCancel
                                ? [
                                      {
                                          label: "Cancel",
                                          custom: (
                                              <ButtonWithAlert
                                                  buttonTitle="Cancel"
                                                  dialogTitle="Cancel Order?"
                                                  dialogDesc={`Are you sure you want to cancel order "${order.orderNumber}"? This action cannot be undone.`}
                                                  dialogActionTitle="Cancel Order"
                                                  dialogActionfn={() => cancelOrder(order.orderId)}
                                                  aria-label={`Cancel ${order.orderNumber}`}
                                                  disabled={isCancelling || order.orderStatus === "CANCELLED" || order.orderStatus === "DELIVERED"}
                                              />
                                          ),
                                      },
                                  ]
                                : []),
                        ]}
                    />
                );
            },
        },
    ];

    const handleSearch = () => {
        setPagination(prev => ({
            ...prev,
            page: 0,
        }));
        setSearch(searchInput.trim());
    };

    const handleClearFilters = () => {
        setSearchInput("");
        setSearch("");
        setOrderStatus("");
        setPaymentStatus("");
        setPagination(prev => ({
            ...prev,
            page: 0,
        }));
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Manage Orders</h1>
                <p className="text-sm text-muted-foreground">View and manage customer orders.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 grid gap-4 md:grid-cols-4">
                        <div className="space-y-2 md:col-span-2">
                            <Input
                                placeholder="Search by order number..."
                                value={searchInput}
                                onChange={event => setSearchInput(event.target.value)}
                                onKeyDown={event => {
                                    if (event.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                            />
                        </div>

                        <Select
                            value={orderStatus || "All Order Status"}
                            onValueChange={value => {
                                setOrderStatus(value === "ALL" ? "" : (value as OrderStatus));
                                setPagination(prev => ({
                                    ...prev,
                                    page: 0,
                                }));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Order Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Order Status</SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                                <SelectItem value="PROCESSING">Processing</SelectItem>
                                <SelectItem value="SHIPPED">Shipped</SelectItem>
                                <SelectItem value="DELIVERED">Delivered</SelectItem>
                                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={paymentStatus || "All Order Status"}
                            onValueChange={value => {
                                setPaymentStatus(value === "ALL" ? "" : (value as PaymentStatus));
                                setPagination(prev => ({
                                    ...prev,
                                    page: 0,
                                }));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Payment Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Payment Status</SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="PAID">Paid</SelectItem>
                                <SelectItem value="FAILED">Failed</SelectItem>
                                <SelectItem value="REFUNDED">Refunded</SelectItem>
                                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mb-4 flex gap-2">
                        <Button type="button" onClick={handleSearch}>
                            Search
                        </Button>

                        <Button type="button" variant="outline" onClick={handleClearFilters}>
                            Clear
                        </Button>
                    </div>

                    {error && <FormError message="Failed to load orders." />}

                    <DataTable
                        columns={columns}
                        data={data?.data?.content ?? []}
                        loading={isLoading}
                        page={data?.data?.page ?? pagination.page}
                        size={data?.data?.size ?? pagination.size}
                        totalElements={data?.data?.totalElements ?? 0}
                        totalPages={data?.data?.totalPages ?? 0}
                        onPageChange={newPage => {
                            setPagination(prev => ({
                                ...prev,
                                page: newPage,
                            }));
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default OrdersListingPage;
