import { ProductApi } from "@/admin/api/Product.api";
import { DataTable, DataTableColumnHeader, DataTableRowActions } from "@/admin/components/table";
import type { Product } from "@/admin/types/Product.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

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
                <div className="flex gap-2">
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
        cell: ({ row }) => (
            <DataTableRowActions
                row={row}
                onView={product => {
                    console.log("View product:", product);
                }}

                onEdit={product => {
                    console.log("Edit product:", product);
                }}

                actions={[
                    {
                        label: "Manage Variants",
                        variant: "accent",
                        onClick: product => {
                            console.log("Manage variants:", product);
                        },
                    },
                    {
                        label: "Manage Images",
                        variant: "teal",
                        onClick: product => {
                            console.log("Manage images:", product);
                        },
                    },
                ]}

                onDelete={product => {
                    console.log("Delete product:", product);
                }}
            />
        ),
    },
];

const ProductListing = () => {
    const [pagination, setPagination] = useState<PaginationRequest>({
        page: 0,
        size: 10,
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products", pagination],
        queryFn: () => ProductApi.getAllProducts(pagination),
    });

    if (isError) {
        return <div>{error.message}</div>;
    }

    const products = data?.data.content ?? [];
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Products</h1>

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
