import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { ProductApi } from "@/admin/api/Product.api";
import { TagApi } from "@/admin/api/Tag.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import ToastService from "@/services/ToastService";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import type { TagResponse } from "@/admin/types/Tag.types";
import { DataTable } from "@/admin/components/table";

const ManageProductTags = () => {
    const queryClient = useQueryClient();
    const [productId, setProductId] = useState("");
    const [tagId, setTagId] = useState("");
    const [productOptionsPagination] = useState<PaginationRequest>({
        page: 0,
        size: 30,
    });
    const [tagOptionsPagination] = useState<PaginationRequest>({
        page: 0,
        size: 30,
    });
    const [assignmentPagination, setAssignmentPagination] = useState<PaginationRequest>({
        page: 0,
        size: 10,
    });

    // Product options
    const { data: productOptionsResponse, isLoading: isProductOptionsLoading } = useQuery({
        queryKey: ["productOptions", productOptionsPagination],
        queryFn: () => ProductApi.getProductOptions(productOptionsPagination),
    });

    // Tag options
    const { data: tagOptionsResponse, isLoading: isTagOptionsLoading } = useQuery({
        queryKey: ["tagOptions", tagOptionsPagination],
        queryFn: () => TagApi.getTagOptions(tagOptionsPagination),
    });

    // Product-tag assignment listing
    const { data: assignmentResponse, isLoading: isAssignmentsLoading } = useQuery({
        queryKey: ["productTagAssignments", assignmentPagination],
        queryFn: () => ProductApi.getProductTagAssignments(assignmentPagination),
    });

    // Assign tag
    const { mutate: assignTag, isPending: isAssigning } = useMutation({
        mutationFn: () => ProductApi.assignTagToProduct(productId, tagId),
        onSuccess: response => {
            ToastService.success(response.message);
            setTagId("");
            queryClient.invalidateQueries({
                queryKey: ["productTagAssignments"],
            });
        },
        onError: error => {
            ToastService.error(error.message);
        },
    });

    // Remove tag
    const { mutate: removeTag, isPending: isRemoving } = useMutation({
        mutationFn: ({ productId, tagId }: { productId: string; tagId: string }) => ProductApi.removeTagFromProduct(productId, tagId),
        onSuccess: response => {
            ToastService.success(response.message);
            queryClient.invalidateQueries({
                queryKey: ["productTagAssignments"],
            });
        },
        onError: error => {
            ToastService.error(error.message);
        },
    });

    const products = productOptionsResponse?.data?.content ?? [];
    const tags = tagOptionsResponse?.data?.content ?? [];
    const assignments = assignmentResponse?.data?.content ?? [];
    const isProcessing = isAssigning || isRemoving;
    const handleAssignTag = () => {
        if (!productId || !tagId || isProcessing) {
            return;
        }
        assignTag();
    };

    const handleRemoveTag = (productId: string, tagId: string) => {
        if (isProcessing) {
            return;
        }
        removeTag({ productId, tagId });
    };

    const columns = [
        {
            accessorKey: "productName",
            header: "Product",
        },
        {
            accessorKey: "tagName",
            header: "Tag",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({
                row,
            }: {
                row: {
                    original: TagResponse;
                };
            }) => {
                const assignment = row.original;

                return (
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        disabled={isProcessing}
                        onClick={() => handleRemoveTag(assignment.productId, assignment.tagId)}
                    >
                        <Trash2 className="size-4" />
                        Remove
                    </Button>
                );
            },
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Manage Product Tags</h1>

                <p className="text-sm text-muted-foreground">Assign and remove tags from products.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Assign Tag to Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-[1fr_1fr_auto] md:items-end">
                        <div className="space-y-2">
                            <Label htmlFor="productId">Product</Label>
                            <select
                                id="productId"
                                value={productId}
                                disabled={isProductOptionsLoading || isProcessing}
                                onChange={event => {
                                    setProductId(event.target.value);
                                }}
                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">{isProductOptionsLoading ? "Loading products..." : "Select product"}</option>
                                {products.map(product => (
                                    <option key={product.productId} value={product.productId}>
                                        {product.productName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tagId">Tag</Label>
                            <select
                                id="tagId"
                                value={tagId}
                                disabled={isTagOptionsLoading || isProcessing}
                                onChange={event => {
                                    setTagId(event.target.value);
                                }}
                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">{isTagOptionsLoading ? "Loading tags..." : "Select tag"}</option>
                                {tags.map(tag => (
                                    <option key={tag.tagId} value={tag.tagId}>
                                        {tag.tagName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Button type="button" disabled={!productId || !tagId || isProcessing} onClick={handleAssignTag}>
                            {isAssigning ? "Assigning..." : "Assign Tag"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Product Tag Assignments</CardTitle>
                </CardHeader>

                <CardContent>
                    <DataTable
                        columns={columns}
                        data={assignments}
                        page={assignmentResponse?.data.page ?? 0}
                        loading={isAssignmentsLoading}
                        size={assignmentResponse?.data.size ?? assignmentPagination.size}
                        totalElements={assignmentResponse?.data.totalElements ?? 0}
                        totalPages={assignmentResponse?.data.totalPages ?? 0}
                        onPageChange={page =>
                            setAssignmentPagination(previous => ({
                                ...previous,
                                page,
                            }))
                        }
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageProductTags;
