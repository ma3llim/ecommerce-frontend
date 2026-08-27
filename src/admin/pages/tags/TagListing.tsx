import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { TagApi } from "@/admin/api/Tag.api";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import { Button } from "@/components/ui/button";
import ToastService from "@/services/ToastService";
import type { Tag } from "@/admin/types/products/Tag.types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableRowActions } from "@/admin/components/table";
import ButtonWithAlert from "@/admin/components/ButtonWithAlert";

const TagListing = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [pagination, setPagination] = useState<PaginationRequest>({
        page: 0,
        size: 10,
    });

    const { data: tagResponse, isLoading } = useQuery({
        queryKey: ["tagList", pagination],
        queryFn: () => TagApi.getTags(pagination),
    });

    const { mutate: deleteTag, isPending: isDeleting } = useMutation({
        mutationFn: (tagId: string) => TagApi.deleteTag(tagId),

        onSuccess: response => {
            ToastService.success(response.message);

            queryClient.invalidateQueries({
                queryKey: ["tagList"],
            });
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    const tags: Tag[] = tagResponse?.data?.content ?? [];

    const tagColumns: ColumnDef<Tag>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "slug",
            header: "Slug",
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString(),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const tag = row.original;

                return (
                    <DataTableRowActions
                        actions={[
                            {
                                label: "Edit",
                                icon: Pencil,
                                variant: "primary",
                                disabled: isDeleting,
                                onClick: () => navigate(`/admin/tags/edit-tag/${tag.id}`),
                            },
                            {
                                label: "Delete",
                                custom: (
                                    <ButtonWithAlert
                                        dialogTitle="Delete Tag?"
                                        dialogDesc={`Are you sure you want to delete "${tag.name}"? This action cannot be undone.`}
                                        dialogActionTitle="Delete"
                                        dialogActionfn={() => deleteTag(tag.id)}
                                        aria-label={`Delete ${tag.name}`}
                                        disabled={isDeleting}
                                    >
                                        <Trash2 className="size-4" />
                                        Delete
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Tags</h1>

                    <p className="text-sm text-muted-foreground">Manage product tags.</p>
                </div>

                <Button onClick={() => navigate("/admin/tags/add-tag")}>
                    <Plus className="mr-2 size-4" />
                    Add Tag
                </Button>
            </div>

            <DataTable
                columns={tagColumns}
                data={tags}
                page={tagResponse?.data.page ?? 0}
                loading={isLoading}
                size={tagResponse?.data.size ?? pagination.size}
                totalElements={tagResponse?.data.totalElements ?? 0}
                totalPages={tagResponse?.data.totalPages ?? 0}
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

export default TagListing;
