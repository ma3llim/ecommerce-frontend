import { CategoryApi } from "@/admin/api/Category.api";
import { ProductApi } from "@/admin/api/Product.api";
import { addProductSchema, type AddProductFormValues } from "@/admin/types/products/ProductSchema";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ToastService from "@/services/ToastService";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [pagination, setPagination] = useState<PaginationRequest>({
        page: 0,
        size: 30,
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<AddProductFormValues>({
        resolver: yupResolver(addProductSchema),
        defaultValues: {
            categoryId: "",
            name: "",
            description: "",
            specifications: [
                {
                    key: "",
                    value: "",
                },
            ],
        },
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "specifications",
    });

    const { data: categoryResponse, isLoading: isCategoryLoading } = useQuery({
        queryKey: ["productsCategoryListing", { page: 0, size: 30 }],
        queryFn: () => CategoryApi.getActiveCategory(pagination),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: ProductApi.addProduct,

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            ToastService.success(response.message);
            navigate("/admin/products/product-listing");
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    const onSubmit = (data: AddProductFormValues) => {
        if (isPending) return;

        const specifications = data.specifications.reduce<Record<string, string>>((acc, specification) => {
            const key = specification.key.trim();
            const value = specification.value.trim();

            if (key && value) {
                acc[key] = value;
            }

            return acc;
        }, {});

        mutate({
            categoryId: data.categoryId,
            name: data.name,
            description: data.description,
            specifications,
        });
    };

    const categories =
        categoryResponse?.data?.content?.map(category => ({
            categoryId: category.id,
            categoryName: category.name,
        })) ?? [];
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="categoryId">Category</Label>
                        <select
                            id="categoryId"
                            disabled={isPending || isCategoryLoading}
                            {...register("categoryId")}
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">{isCategoryLoading ? "Loading categories..." : "Select category"}</option>

                            {categories.map(category => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                        <FormError message={errors.categoryId?.message} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" disabled={isPending} placeholder="Enter product name" {...register("name")} />
                        <FormError message={errors.name?.message} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" disabled={isPending} placeholder="Enter product description" rows={5} {...register("description")} />
                        <FormError message={errors.description?.message} />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label>Specifications</Label>
                                <p className="text-sm text-muted-foreground">Add product specifications such as brand, color, material, etc.</p>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                disabled={isPending}
                                onClick={() =>
                                    append({
                                        key: "",
                                        value: "",
                                    })
                                }
                            >
                                Add Specification
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-start gap-3">
                                    <div className="flex-1 space-y-2">
                                        <Input disabled={isPending} placeholder="Key e.g. Brand" {...register(`specifications.${index}.key`)} />
                                        <FormError message={errors.specifications?.[index]?.key?.message} />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Input disabled={isPending} placeholder="Value e.g. Apple" {...register(`specifications.${index}.value`)} />
                                        <FormError message={errors.specifications?.[index]?.value?.message} />
                                    </div>

                                    <Button type="button" variant="destructive" disabled={isPending || fields.length === 1} onClick={() => remove(index)}>
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t pt-6">
                        <Button disabled={isPending} type="button" variant="outline" onClick={() => navigate("/admin/products/product-listing")}>
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating..." : "Create Product"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
};

export default AddProductForm;
