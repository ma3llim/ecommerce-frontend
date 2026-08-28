import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { ShipmentApi } from "@/admin/api/Shipment.api";
import { DataTable, DataTableRowActions } from "@/admin/components/table";
import ErrorState from "@/components/common/ErrorState";
import type { ShipmentResponse, ShipmentStatus } from "@/admin/types/Shipment.types";
import useDebounce from "@/hooks/useDebounce";
import { Helmet } from "react-helmet-async";

const ShipmentListing = () => {
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
    });

    const [shipmentStatus, setShipmentStatus] = useState<ShipmentStatus | "">("");
    const [courierName, setCourierName] = useState("");
    const debouncedCourierName = useDebounce(courierName, 500);

    const { data, isLoading, error } = useQuery({
        queryKey: ["shipments", pagination.page, pagination.size, shipmentStatus, debouncedCourierName],

        queryFn: () =>
            ShipmentApi.getShipments({
                page: pagination.page,
                size: pagination.size,
                shipmentStatus: shipmentStatus || undefined,
                courierName: debouncedCourierName || undefined,
            }),
    });

    const columns: ColumnDef<ShipmentResponse>[] = [
        {
            accessorKey: "trackingNumber",
            header: "Tracking Number",
        },
        {
            accessorKey: "courierName",
            header: "Courier",
        },
        {
            accessorKey: "shipmentStatus",
            header: "Status",
        },
        {
            accessorKey: "orderId",
            header: "Order ID",
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const shipment = row.original;
                return (
                    <DataTableRowActions
                        actions={[
                            {
                                label: "View",
                                icon: Eye,
                                variant: "info",
                                onClick: () => navigate(`/admin/shipments/shipment-details/${shipment.shipmentId}`),
                            },
                        ]}
                    />
                );
            },
        },
    ];

    const shipments = data?.data?.content ?? [];

    if (error) {
        return <ErrorState message={error.message} />;
    }
    return (
        <>
            <Helmet>
                <title>Shipment Listing | Admin</title>
                <meta name="description" content="View and manage ecommerce shipments, tracking information, shipment status, and delivery updates." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">Shipments</h1>

                    <p className="text-sm text-muted-foreground">Manage shipments, tracking, and delivery status.</p>
                </div>

                <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <select
                        value={shipmentStatus}
                        onChange={event => {
                            setShipmentStatus(event.target.value as ShipmentStatus | "");

                            setPagination(previous => ({
                                ...previous,
                                page: 0,
                            }));
                        }}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                        <option value="">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="IN_TRANSIT">In Transit</option>
                        <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                        <option value="DELIVERED">Delivered</option>
                    </select>

                    <input
                        value={courierName}
                        onChange={event => {
                            setCourierName(event.target.value);

                            setPagination(previous => ({
                                ...previous,
                                page: 0,
                            }));
                        }}
                        placeholder="Courier name"
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                    />
                </div>

                <DataTable
                    columns={columns}
                    data={shipments}
                    loading={isLoading}
                    page={data?.data?.page ?? 0}
                    size={data?.data?.size ?? pagination.size}
                    totalElements={data?.data?.totalElements ?? 0}
                    totalPages={data?.data?.totalPages ?? 0}
                    onPageChange={page =>
                        setPagination(previous => ({
                            ...previous,
                            page,
                        }))
                    }
                />
            </div>
        </>
    );
};

export default ShipmentListing;
