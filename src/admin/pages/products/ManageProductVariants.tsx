import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Package, Pencil, Plus, Power } from "lucide-react";
import { ProductApi } from "@/admin/api/Product.api";
import type { ProductVariant, VariantStatus } from "@/admin/types/products/ProductVariant.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToastService from "@/services/ToastService";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableRowActions } from "@/admin/components/table";
import ButtonWithAlert from "@/admin/components/ButtonWithAlert";

const ManageProductVariants = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["productVariants", productId],
        queryFn: () => ProductApi.getProductVariants(productId!),
        enabled: !!productId,
    });

    const { mutate: deleteVariant, isPending: isDeleting } = useMutation({
        mutationFn: (variantId: string) => ProductApi.deleteProductVariant(productId!, variantId),

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["productVariants", productId],
            });
            ToastService.success(response.message);
        },
        onError: error => {
            ToastService.error(error.message);
        },
    });
    const { mutate: updateVariantStatus, isPending: isUpdatingStatus } = useMutation({
        mutationFn: ({ variantId, status }: { variantId: string; status: VariantStatus }) => ProductApi.updateVariantStatus(productId!, variantId, status),
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["productVariants", productId],
            });

            ToastService.success(response.message);
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    const variants = data?.data ?? [];
    const variantColumns: ColumnDef<ProductVariant>[] = [
        {
            accessorKey: "sku",
            header: "SKU",
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => {
                const price = row.getValue<number>("price");

                return `₹${price.toFixed(2)}`;
            },
        },
        {
            accessorKey: "stockQuantity",
            header: "Stock",
        },
        {
            accessorKey: "attributes",
            header: "Attributes",
            cell: ({ row }) => {
                const attributes = row.getValue<Record<string, string>>("attributes");
                return (
                    <div className="flex flex-wrap gap-1">
                        {Object.entries(attributes).map(([key, value]) => (
                            <span key={key} className="rounded-md border px-2 py-1 text-xs">
                                {key}: {value}
                            </span>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: "images",
            header: "Images",
            cell: ({ row }) => {
                const images = row.getValue<ProductVariant["images"]>("images");

                return images.length;
            },
        },
        {
            accessorKey: "active",
            header: "Status",
            cell: ({ row }) => {
                const active = row.getValue<boolean>("active");
                return (
                    <span
                        className={
                            active
                                ? "rounded-full border px-2.5 py-1 text-xs font-medium"
                                : "rounded-full border px-2.5 py-1 text-xs font-medium text-muted-foreground"
                        }
                    >
                        {active ? "Active" : "Inactive"}
                    </span>
                );
            },
        },
        {
            id: "actions",
            accessorKey: "Actions",
            cell: ({ row }) => {
                const variant = row.original;
                return (
                    <DataTableRowActions
                        actions={[
                            {
                                label: "Edit",
                                icon: Pencil,
                                variant: "primary",
                                disabled: isDeleting || isUpdatingStatus,
                                onClick: () => navigate(`/admin/products/${productId}/variants/${variant.id}/edit`),
                            },
                            {
                                label: "Images",
                                icon: Package,
                                variant: "success",
                                disabled: isDeleting || isUpdatingStatus,
                                onClick: () => navigate(`/admin/products/${productId}/variants/${variant.id}/images`),
                            },
                            {
                                label: "Delete",
                                custom: (
                                    <ButtonWithAlert
                                        dialogTitle="Delete Variant?"
                                        dialogDesc={`Are you sure you want to delete variant "${variant.sku}"? This action cannot be undone.`}
                                        dialogActionTitle="Delete"
                                        dialogActionfn={() => deleteVariant(variant.id)}
                                        aria-label={`Delete variant ${variant.sku}`}
                                        disabled={isDeleting || isUpdatingStatus}
                                    ></ButtonWithAlert>
                                ),
                            },
                            {
                                label: variant.active ? "Deactivate" : "Activate",
                                icon: Power,
                                variant: "warning",
                                disabled: isDeleting || isUpdatingStatus,
                                onClick: () =>
                                    updateVariantStatus({
                                        variantId: variant.id,
                                        status: variant.active ? "INACTIVE" : "ACTIVE",
                                    }),
                            },
                        ]}
                    />
                );
            },
        },
    ];

    return (
        <div className="mx-auto w-full">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Manage Variants</h1>
                    <p className="text-sm text-muted-foreground">Manage variants, stock, pricing, and images for this product.</p>
                </div>
                <Button type="button" onClick={() => navigate(`/admin/products/${productId}/variants/add`)}>
                    <Plus className="mr-2 size-4" />
                    Add Variant
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Product Variants</CardTitle>
                </CardHeader>

                <CardContent>
                    <DataTable
                        columns={variantColumns}
                        data={variants}
                        loading={isLoading}
                        page={0}
                        size={variants.length}
                        totalElements={variants.length}
                        totalPages={1}
                        onPageChange={() => {}}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageProductVariants;
