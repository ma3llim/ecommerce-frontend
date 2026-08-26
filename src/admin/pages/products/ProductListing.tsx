import { ProductApi } from "@/admin/api/Product.api";
import ButtonWithAlert from "@/admin/components/ButtonWithAlert";
import { DataTable, DataTableColumnHeader, DataTableRowActions } from "@/admin/components/table";
import type { Product } from "@/admin/types/Product.types";
import { queryClient } from "@/query/queryClient";
import ToastService from "@/services/ToastService";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Package, Pencil, Power, Trash2 } from "lucide-react";
import { useState } from "react";
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
            accessorKey: "specifications",
            header: "Specifications",
            cell: ({ row }) => {
                const specifications = row.original.specifications;
                return (
                    <div className="flex gap-2 flex-wrap">
                        {Object.entries(specifications).map(([key, value]) => (
                            <span key={key} className="text-sm">
                                {key}: {String(value)}
                            </span>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: "published",
            header: "Published",
            cell: ({ row }) => {
                const published = row.getValue<boolean>("published");
                return published ? "Published" : "Draft";
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
                                disabled: productIsPending,
                                onClick: () => navigate(`/admin/products/view-product/${product.id}`),
                            },
                            {
                                label: "Edit",
                                icon: Pencil,
                                variant: "primary",
                                disabled: productIsPending,
                                onClick: () => navigate(`/admin/products/edit-product/${product.id}`),
                            },
                            {
                                label: "Variants",
                                icon: Package,
                                variant: "success",
                                disabled: productIsPending,
                                onClick: () => handleVariants(product.id),
                            },
                            {
                                label: product.published ? "Unpublish" : "Publish",
                                icon: Power,
                                variant: "warning",
                                disabled: productIsPending,
                                onClick: () => handlePublish(product.id),
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

    const handleVariants = (productId: string) => {
        console.log("product ID" + productId);
    };
    const handlePublish = (productId: string) => {
        console.log("product ID" + productId);
    };

    if (isError) {
        return <div>{error.message}</div>;
    }

    return (
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
    );
};

export default ProductListing;
