import { ProductApi } from "@/admin/api/Product.api";
import ButtonWithAlert from "@/admin/components/ButtonWithAlert";
import { DataTable, DataTableColumnHeader, DataTableRowActions } from "@/admin/components/table";
import type { Product } from "@/admin/types/products/Product.types";
import { Badge } from "@/components/ui/badge";
import { queryClient } from "@/query/queryClient";
import ToastService from "@/services/ToastService";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, MessageCircleQuestion, Package, Pencil, Power, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const ProductListing = () => {
    const navigate = useNavigate();
    const [pagination, setPagination] = useState<PaginationRequest>({
        page: 0,
        size: 10,
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products", pagination],
        queryFn: () => ProductApi.getAllProducts(pagination),
    });

    const products = data?.data.content ?? [];

    const productColumns: ColumnDef<Product>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Product" />,
        },
        {
            accessorKey: "categoryName",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
        },
        {
            accessorKey: "published",
            header: "Published",
            cell: ({ row }) => {
                const published = row.getValue<boolean>("published");
                return <Badge variant={published ? "default" : "secondary"}>{published ? "Published" : "Draft"}</Badge>;
            },
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
            cell: ({ row }) => {
                const createdAt = row.getValue<string>("createdAt");
                return new Date(createdAt).toLocaleDateString();
            },
        },
        {
            id: "actions",
            accessorKey: "Actions",
            cell: ({ row }) => {
                const product = row.original;
                return (
                    <DataTableRowActions
                        actions={[
                            {
                                label: "View",
                                icon: Eye,
                                variant: "info",
                                disabled: productIsPending || isUpdatingStatus,
                                onClick: () => navigate(`/admin/products/view-product/${product.id}`),
                            },
                            {
                                label: "Edit",
                                icon: Pencil,
                                variant: "primary",
                                disabled: productIsPending || isUpdatingStatus,
                                onClick: () => navigate(`/admin/products/edit-product/${product.id}`),
                            },
                            {
                                label: "Variants",
                                icon: Package,
                                variant: "success",
                                disabled: productIsPending || isUpdatingStatus,
                                onClick: () => navigate(`/admin/products/${product.id}/variants`),
                            },
                            {
                                label: product.published ? "Unpublish" : "Publish",
                                icon: Power,
                                variant: "warning",
                                disabled: productIsPending || isUpdatingStatus,
                                onClick: () => updateStatus({ productId: product.id, status: product.published ? "INACTIVE" : "ACTIVE" }),
                            },
                            {
                                label: "FAQs",
                                icon: MessageCircleQuestion,
                                variant: "info",
                                disabled: productIsPending || isUpdatingStatus,
                                onClick: () => navigate(`/admin/products/${product.id}/faqs`),
                            },
                            {
                                label: "Delete",
                                custom: (
                                    <ButtonWithAlert
                                        dialogTitle="Delete Product?"
                                        dialogDesc={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
                                        dialogActionTitle="Delete"
                                        dialogActionfn={() => productDelete(product.id)}
                                        aria-label={`Delete ${product.name}`}
                                        disabled={productIsPending}
                                    >
                                        <Trash2 className="size-4" /> Delete
                                    </ButtonWithAlert>
                                ),
                            },
                        ]}
                    />
                );
            },
        },
    ];

    const { mutate: productDelete, isPending: productIsPending } = useMutation({
        mutationFn: (categoryId: string) => ProductApi.deleteProduct(categoryId),
        onSuccess: response => {
            ToastService.success(response.message);
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError: error => {
            ToastService.error(error.message);
        },
    });

    const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
        mutationFn: ({ productId, status }: { productId: string; status: "ACTIVE" | "INACTIVE" }) =>
            ProductApi.updateProductStatus(productId!, {
                status,
            }),

        onSuccess: (response, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            queryClient.invalidateQueries({
                queryKey: ["product", variables.productId],
            });
            ToastService.success(response.message);
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    if (isError) {
        return <div>{error.message}</div>;
    }

    return (
        <>
            <Helmet>
                <title>Product Listing | Admin</title>
                <meta
                    name="description"
                    content="View and manage all ecommerce products, including product information, pricing, inventory, variants, and status."
                />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-">Products</h1>
                    <p className="text-muted-foreground">Manage your products.</p>
                </div>
                <DataTable
                    columns={productColumns}
                    data={products}
                    page={data?.data.page ?? 0}
                    loading={isLoading}
                    size={data?.data.size ?? pagination.size}
                    totalElements={data?.data.totalElements ?? 0}
                    totalPages={data?.data.totalPages ?? 0}
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

export default ProductListing;
