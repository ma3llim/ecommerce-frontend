import { CategoryApi } from "@/admin/api/Category.api";
import ButtonWithAlert from "@/admin/components/ButtonWithAlert";
import type { Category } from "@/admin/types/Category.types";
import ErrorState from "@/components/common/ErrorState";
import PageLoader from "@/components/common/PageLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ToastService from "@/services/ToastService";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import { formatDate } from "@/utils/Time";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
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
    const handleEdit = categoryId => {};
    return (
        // <div className="space-y-6">
        //     <div>
        //         <h1 className="text-2xl font-semibold">Categories</h1>
        //         <p className="text-sm text-muted-foreground">Manage your product categories.</p>
        //     </div>
        //     <div className="rounded-lg border">
        //         <div className="overflow-x-auto">
        //             <table className="w-full">
        //                 <thead>
        //                     <tr className="border-b">
        //                         <th className="p-4 text-left">Image</th>
        //                         <th className="p-4 text-left">Name</th>
        //                         <th className="p-4 text-left">Slug</th>
        //                         <th className="p-4 text-left">Status</th>
        //                         <th className="p-4 text-left">Actions</th>
        //                     </tr>
        //                 </thead>

        //                 <tbody>
        //                     {pageData?.content.map((category: Category) => (
        //                         <tr key={category.categoryId} className="border-b">
        //                             <td className="p-4">
        //                                 <img src={category.imageUrl} alt={category.name} className="h-12 w-12 rounded-md object-cover" />
        //                             </td>
        //                             <td className="p-4 font-medium">{category.name}</td>
        //                             <td className="p-4 text-muted-foreground">{category.slug}</td>
        //                             <td className="p-4">{category.active ? "Active" : "Inactive"}</td>

        //                             <td className="p-4">{/* Edit/Delete */}</td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>

        //     {/* Pagination */}
        //     <div className="flex items-center justify-between">
        //         <p className="text-sm text-muted-foreground">
        //             Page {pageData ? pageData.page + 1 : 1} of {pageData?.totalPages ?? 1}
        //         </p>

        //         <div className="flex gap-2">
        //             <button
        //                 type="button"
        //                 disabled={pageData?.first ?? true}
        //                 onClick={() =>
        //                     setPagination(prev => ({
        //                         ...prev,
        //                         page: Math.max((prev.page ?? 0) - 1, 0),
        //                     }))
        //                 }
        //                 className="rounded-md cursor-pointer border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        //             >
        //                 Previous
        //             </button>

        //             <button
        //                 type="button"
        //                 disabled={pageData?.last ?? true}
        //                 onClick={() =>
        //                     setPagination(prev => ({
        //                         ...prev,
        //                         page: (prev.page ?? 0) + 1,
        //                     }))
        //                 }
        //                 className="rounded-md cursor-pointer border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        //             >
        //                 Next
        //             </button>
        //         </div>
        //     </div>
        // </div>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>Manage your product categories.</CardDescription>
                </div>

                <Button onClick={() => navigate("/admin/categories/add-category")}>Add Category</Button>
            </CardHeader>

            <CardContent>
                <div className="rounded-md border overflow-hidden">
                    <Table>
                        <TableHeader className="bg-background">
                            <TableRow>
                                <TableHead className="w-42">Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Updated</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data?.data.content.map(category => (
                                <TableRow key={category.categoryId}>
                                    <TableCell>
                                        <img src={category.imageUrl} alt={category.name} loading="lazy" className="h-20 w-32 rounded-md border object-center" />
                                    </TableCell>

                                    <TableCell className="font-medium">{category.name}</TableCell>

                                    <TableCell>
                                        <Badge variant={category.active ? "default" : "secondary"}>{category.active ? "Active" : "Inactive"}</Badge>
                                    </TableCell>

                                    <TableCell>{formatDate(category.createdAt)}</TableCell>

                                    <TableCell>{formatDate(category.updatedAt)}</TableCell>

                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="icon" variant="outline" onClick={() => handleEdit(category.categoryId)}>
                                                <Pencil />
                                            </Button>

                                            <ButtonWithAlert
                                                dialogTitle="Delete Category?"
                                                dialogDesc={`Are you sure you want to delete "${category.name}"? This action cannot be undone.`}
                                                dialogActionTitle="Delete"
                                                dialogActionfn={() => categoryDelete(category.categoryId)}
                                                aria-label={`Delete ${category.name}`}
                                                disabled={categoryIsPending}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </ButtonWithAlert>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between pt-4">
                    <p className="text-sm text-muted-foreground">
                        Showing {data?.data.content.length ?? 0} of {data?.data.totalElements ?? 0} categories
                    </p>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            disabled={data?.data.first}
                            onClick={() =>
                                setPagination(prev => ({
                                    ...prev,
                                    page: (prev.page ?? 0) - 1,
                                }))
                            }
                        >
                            Previous
                        </Button>

                        <span className="text-sm">
                            Page {(data?.data.page ?? 0) + 1} of {data?.data.totalPages ?? 0}
                        </span>

                        <Button
                            variant="outline"
                            disabled={data?.data.last}
                            onClick={() =>
                                setPagination(prev => ({
                                    ...prev,
                                    page: (prev.page ?? 0) + 1,
                                }))
                            }
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CategoryListing;
