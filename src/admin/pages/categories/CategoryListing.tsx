import { CategoryApi } from "@/admin/api/Category.api";
import ButtonWithAlert from "@/admin/components/ButtonWithAlert";
import { DataTable, DataTableRowActions } from "@/admin/components/table";
import type { Category } from "@/admin/types/Category.types";
import ErrorState from "@/components/common/ErrorState";
import PageLoader from "@/components/common/PageLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ToastService from "@/services/ToastService";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import { formatDate } from "@/utils/Time";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const CategoryListing = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [pagination, setPagination] = useState<PaginationRequest>({
        page: 0,
        size: 10,
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["categoryList", pagination],
        queryFn: () => CategoryApi.getAllCategoris(pagination),
    });

    const { mutate: categoryDelete, isPending: categoryIsPending } = useMutation({
        mutationFn: (categoryId: string) => CategoryApi.deleteCategory(categoryId),
        onSuccess: response => {
            ToastService.success(response.message);
            queryClient.invalidateQueries({
                queryKey: ["categoryList"],
            });
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError: error => {
            ToastService.error(error.message);
        },
    });

    if (isLoading) {
        return <PageLoader />;
    }

    if (isError) {
        return <ErrorState message="Something went wrong while fetch categories" />;
    }

    const CategoryColumns = (): ColumnDef<Category>[] => [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
        },
        {
            accessorKey: "imageUrl",
            header: "Image",
            cell: ({ row }) => {
                return (
                    <div className="flex justify-center">
                        <img src={row.original.imageUrl} alt={row.original.name} loading="lazy" className="h-20 w-32 rounded-md border object-cover" />
                    </div>
                );
            },
        },
        {
            accessorKey: "active",
            header: "Status",
            cell: ({ row }) => <Badge variant={row.original.active ? "default" : "secondary"}>{row.original.active ? "Active" : "Inactive"}</Badge>,
        },

        {
            accessorKey: "createdAt",
            header: "Created",
            cell: ({ row }) => formatDate(row.original.createdAt),
        },

        {
            accessorKey: "updatedAt",
            header: "Updated",
            cell: ({ row }) => formatDate(row.original.updatedAt),
        },

        {
            id: "actions",
            header: "Actions",
            enableSorting: false,
            enableHiding: false,

            cell: ({ row }) => {
                const category = row.original;

                return (
                    <DataTableRowActions
                        actions={[
                            {
                                label: "Edit",
                                icon: Pencil,
                                variant: "primary",
                                disabled: categoryIsPending,
                                onClick: () => navigate(`/admin/categories/${category.categoryId}/edit`),
                            },
                            {
                                label: "Delete",
                                custom: (
                                    <ButtonWithAlert
                                        dialogTitle="Delete Category?"
                                        dialogDesc={`Are you sure you want to delete "${category.name}"? This action cannot be undone.`}
                                        dialogActionTitle="Delete"
                                        dialogActionfn={() => categoryDelete(category.categoryId)}
                                        aria-label={`Delete ${category.name}`}
                                        disabled={categoryIsPending}
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
    return (
        <>
            <Helmet>
                <title>Categories | ecommerce</title>
                <meta name="description" content="Manage ecommerce product categories from the admin panel." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Categories</CardTitle>
                        <CardDescription>Manage your product categories.</CardDescription>
                    </div>

                    <Button onClick={() => navigate("/admin/categories/add-category")}>Add Category</Button>
                </CardHeader>

                <CardContent>
                    <DataTable
                        columns={CategoryColumns()}
                        data={data?.data.content ?? []}
                        loading={isLoading}
                        page={data?.data.page ?? 0}
                        size={data?.data.size ?? 10}
                        totalElements={data?.data.totalElements ?? 0}
                        totalPages={data?.data.totalPages ?? 0}
                        onPageChange={page => {
                            setPagination(prev => ({
                                ...prev,
                                page,
                            }));
                        }}
                    />
                </CardContent>
            </Card>
        </>
    );
};

export default CategoryListing;
