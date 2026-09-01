import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { PaymentApi } from "@/admin/api/PaymentApi";
import type { PaymentListParams, PaymentResponse, PaymentStatus, PaymentMethod } from "@/admin/types/Payment.types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DataTable, DataTableRowActions } from "@/admin/components/table";
import type { ColumnDef } from "@tanstack/react-table";
import { Helmet } from "react-helmet-async";
const paymentStatuses: PaymentStatus[] = ["PENDING", "SUCCESS", "CAPTURED", "FAILED", "REFUNDED"];
const paymentMethods: PaymentMethod[] = ["COD"];

const PaymentsListingPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | "">("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    const params: PaymentListParams = {
        page,
        size,
        search: search || undefined,
        paymentStatus: paymentStatus || undefined,
        paymentMethod: paymentMethod || undefined,
    };

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["payments", page, size, search, paymentStatus, paymentMethod],
        queryFn: () => PaymentApi.getPayments(params),
    });

    const columns: ColumnDef<PaymentResponse>[] = [
        {
            accessorKey: "razorpayOrderId",
            header: "Razorpay Order ID",
            cell: ({ row }) => <span className="font-medium">{row.original.razorpayOrderId}</span>,
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => (
                <span>
                    {row.original.currency} {row.original.amount.toFixed(2)}
                </span>
            ),
        },
        {
            accessorKey: "currency",
            header: "Currency",
        },
        {
            accessorKey: "paymentMethod",
            header: "Payment Method",
            cell: ({ row }) => <span>{row.original.paymentMethod}</span>,
        },
        {
            accessorKey: "paymentStatus",
            header: "Payment Status",
            cell: ({ row }) => <span>{row.original.paymentStatus}</span>,
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const payment = row.original;

                return (
                    <DataTableRowActions
                        actions={[
                            {
                                label: "View",
                                icon: Eye,
                                variant: "info",
                                onClick: () => navigate(`/admin/payments/payment-details/${payment.paymentId}`),
                            },
                        ]}
                    />
                );
            },
        },
    ];

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(0);
    };

    return (
        <>
            <Helmet>
                <title>Payments | ecommerce</title>
                <meta name="description" content="View and manage payment records from the ecommerce admin panel." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Payments</h1>

                    <p className="text-muted-foreground">View and manage payment records.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="payment-search">Search</Label>

                        <Input id="payment-search" placeholder="Search payment..." value={search} onChange={handleSearch} />
                    </div>

                    <div className="space-y-2">
                        <Label>Payment Status</Label>

                        <Select
                            value={paymentStatus || "ALL"}
                            onValueChange={value => {
                                if (!value) {
                                    return;
                                }

                                setPaymentStatus(value === "ALL" ? "" : (value as PaymentStatus));
                                setPage(0);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select payment status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="ALL">All</SelectItem>

                                {paymentStatuses.map(status => (
                                    <SelectItem key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Payment Method</Label>

                        <Select
                            value={paymentMethod || "ALL"}
                            onValueChange={value => {
                                if (value === null) {
                                    return;
                                }
                                setPaymentMethod(value === "ALL" ? "" : (value as PaymentMethod));
                                setPage(0);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="ALL">All</SelectItem>

                                {paymentMethods.map(method => (
                                    <SelectItem key={method} value={method}>
                                        {method}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={data?.data?.content ?? []}
                    loading={isLoading || isFetching}
                    page={data?.data?.page ?? page}
                    size={data?.data?.size ?? size}
                    totalElements={data?.data?.totalElements ?? 0}
                    totalPages={data?.data?.totalPages ?? 0}
                    onPageChange={newPage => {
                        setPage(newPage);
                    }}
                />
            </div>
        </>
    );
};

export default PaymentsListingPage;
