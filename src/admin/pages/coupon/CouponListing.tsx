import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Plus, Power } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CouponApi } from "@/admin/api/Coupon.api";
import type { CouponResponse, CouponStatus } from "@/admin/types/Coupon.types";
import { DataTable, DataTableRowActions } from "@/admin/components/table";
import ButtonWithAlert from "@/admin/components/ButtonWithAlert";
import { Helmet } from "react-helmet-async";

const CouponListing = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    const { data, isLoading } = useQuery({
        queryKey: ["coupons", page, size, search],

        queryFn: () =>
            CouponApi.getCoupons({
                search: search || undefined,
                page,
                size,
            }),
    });

    const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
        mutationFn: ({ couponId, status }: { couponId: string; status: CouponStatus }) =>
            CouponApi.updateCouponStatus(couponId, {
                status,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["coupons"],
            });
        },
    });

    const { mutate: deleteCoupon, isPending: isDeleting } = useMutation({
        mutationFn: (couponId: string) => CouponApi.deleteCoupon(couponId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["coupons"],
            });
        },
    });

    const columns: ColumnDef<CouponResponse>[] = [
        {
            accessorKey: "code",
            header: "Code",
            cell: ({ row }) => <span className="font-medium">{row.original.code}</span>,
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "discountType",
            header: "Discount",
            cell: ({ row }) => (
                <span>
                    {row.original.discountValue}
                    {row.original.discountType === "PERCENTAGE" ? "%" : ""}
                </span>
            ),
        },
        {
            accessorKey: "usageLimit",
            header: "Usage",
            cell: ({ row }) => (
                <span>
                    {row.original.usedCount} / {row.original.usageLimit}
                </span>
            ),
        },
        {
            accessorKey: "active",
            header: "Status",
            cell: ({ row }) => <Badge variant={row.original.active ? "default" : "secondary"}>{row.original.active ? "Active" : "Inactive"}</Badge>,
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const coupon = row.original;

                return (
                    <DataTableRowActions
                        actions={[
                            {
                                label: "View",
                                icon: Eye,
                                variant: "info",
                                disabled: isDeleting || isUpdatingStatus,
                                onClick: () => navigate(`/admin/coupons/${coupon.id}`),
                            },
                            {
                                label: "Edit",
                                icon: Pencil,
                                variant: "primary",
                                disabled: isDeleting || isUpdatingStatus,
                                onClick: () => navigate(`/admin/coupons/${coupon.id}/edit`),
                            },
                            {
                                label: coupon.active ? "Deactivate" : "Activate",
                                icon: Power,
                                variant: "warning",
                                disabled: isDeleting || isUpdatingStatus,
                                onClick: () =>
                                    updateStatus({
                                        couponId: coupon.id,
                                        status: coupon.active ? "INACTIVE" : "ACTIVE",
                                    }),
                            },
                            {
                                label: "Delete",
                                custom: (
                                    <ButtonWithAlert
                                        dialogTitle="Delete Coupon?"
                                        dialogDesc={`Are you sure you want to delete "${coupon.code}"? This action cannot be undone.`}
                                        dialogActionTitle="Delete"
                                        dialogActionfn={() => {
                                            deleteCoupon(coupon.id);
                                        }}
                                        aria-label={`Delete ${coupon.code}`}
                                        disabled={isDeleting || isUpdatingStatus}
                                    />
                                ),
                            },
                        ]}
                    />
                );
            },
        },
    ];

    return (
        <>
            <Helmet>
                <title>Coupons | ecommerce</title>
                <meta name="description" content="View and manage discount coupons from the ecommerce admin panel." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Coupons</h1>

                        <p className="text-sm text-muted-foreground">Manage discount coupons and promotional offers.</p>
                    </div>

                    <Button type="button" onClick={() => navigate("/admin/coupons/add")}>
                        <Plus className="mr-2 size-4" />
                        Add Coupon
                    </Button>
                </div>

                <div className="mb-4 max-w-sm">
                    <Input
                        placeholder="Search coupon code..."
                        value={search}
                        onChange={event => {
                            setSearch(event.target.value);
                            setPage(0);
                        }}
                    />
                </div>

                <DataTable
                    columns={columns}
                    data={data?.data?.content ?? []}
                    loading={isLoading}
                    page={data?.data?.page ?? 0}
                    size={data?.data?.size ?? size}
                    totalElements={data?.data?.totalElements ?? 0}
                    totalPages={data?.data?.totalPages ?? 0}
                    onPageChange={setPage}
                    showPagination
                />
            </div>
        </>
    );
};

export default CouponListing;
