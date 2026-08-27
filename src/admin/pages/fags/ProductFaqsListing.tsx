import { ProductApi } from "@/admin/api/Product.api";
import ButtonWithAlert from "@/admin/components/ButtonWithAlert";
import { DataTable, DataTableRowActions } from "@/admin/components/table";
import type { ProductFaqResponse } from "@/admin/types/products/ProductFaq.types";
import ErrorState from "@/components/common/ErrorState";
import PageLoader from "@/components/common/PageLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ToastService from "@/services/ToastService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Plus, Power } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ProductFaqsListing = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["productFaqs", productId],
        queryFn: () => ProductApi.getProductFaqs(productId!),
        enabled: !!productId,
    });

    const { mutate: deleteFaq, isPending: isDeleting } = useMutation({
        mutationFn: ({ productId, faqId }: { productId: string; faqId: string }) => ProductApi.deleteProductFaq(productId, faqId),

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["productFaqs", productId],
            });
            ToastService.success(response.message);
        },
        onError: error => {
            ToastService.error(error.message);
        },
    });

    const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
        mutationFn: ({ faqId, active }: { faqId: string; active: boolean }) => {
            if (!productId) {
                throw new Error("Product ID is required.");
            }

            return ProductApi.updateProductFaqStatus(productId, faqId, { active });
        },
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["productFaqs", productId],
            });

            ToastService.success(response.message);
        },
        onError: error => {
            ToastService.error(error.message);
        },
    });

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return <ErrorState message={error.message} />;
    }

    const columns: ColumnDef<ProductFaqResponse>[] = [
        {
            accessorKey: "question",
            header: "Question",
            cell: ({ row }) => <div className="max-w-md truncate font-medium">{row.original.question}</div>,
        },
        {
            accessorKey: "answer",
            header: "Answer",
            cell: ({ row }) => <div className="max-w-lg truncate">{row.original.answer}</div>,
        },
        {
            accessorKey: "active",
            header: "Status",
            cell: ({ row }) => <Badge variant={row.original.active ? "default" : "secondary"}>{row.original.active ? "Active" : "Inactive"}</Badge>,
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const faq = row.original;
                return (
                    <DataTableRowActions
                        actions={[
                            {
                                label: "View",
                                icon: Eye,
                                variant: "info",
                                disabled: isDeleting || isUpdatingStatus,
                                onClick: () => navigate(`/admin/products/${productId}/faqs/${faq.id}`),
                            },
                            {
                                label: "Edit",
                                icon: Pencil,
                                variant: "primary",
                                disabled: isDeleting || isUpdatingStatus,
                                onClick: () => navigate(`/admin/products/${productId}/faqs/${faq.id}/edit`),
                            },
                            {
                                label: faq.active ? "Deactivate" : "Activate",
                                icon: Power,
                                variant: "warning",
                                disabled: isDeleting || isUpdatingStatus,
                                onClick: () => updateStatus({ faqId: faq.id, active: !faq.active }),
                            },
                            {
                                label: "Delete",
                                custom: (
                                    <ButtonWithAlert
                                        dialogTitle="Delete FAQ?"
                                        dialogDesc={`Are you sure you want to delete "${faq.question}"? This action cannot be undone.`}
                                        dialogActionTitle="Delete"
                                        dialogActionfn={() => {
                                            if (!productId) {
                                                return;
                                            }

                                            deleteFaq({ productId, faqId: faq.id });
                                        }}
                                        aria-label={`Delete ${faq.question}`}
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
        <div className="mx-auto w-full">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Product FAQs</h1>
                    <p className="text-sm text-muted-foreground">Manage frequently asked questions for this product.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" onClick={() => navigate("/admin/products/product-listing")}>
                        Back to Products
                    </Button>
                    <Button type="button" onClick={() => navigate(`/admin/products/${productId}/faqs/create`)}>
                        <Plus className="mr-2 size-4" />
                        Add FAQ
                    </Button>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={data?.data ?? []}
                loading={isLoading}
                page={0}
                size={data?.data?.length ?? 0}
                totalElements={data?.data?.length ?? 0}
                totalPages={1}
                onPageChange={() => {}}
                showPagination={false}
            />
        </div>
    );
};

export default ProductFaqsListing;
