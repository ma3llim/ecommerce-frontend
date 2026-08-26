import { CategoryApi } from "@/admin/api/Category.api";
import ErrorState from "@/components/common/ErrorState";
import PageLoader from "@/components/common/PageLoader";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ToastService from "@/services/ToastService";
import { updateCategorySchema, type UpdateCategoryFormValues } from "@/validation/admin/categories/CategorySchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { errors },
    } = useForm<UpdateCategoryFormValues>({
        resolver: yupResolver(updateCategorySchema),
        defaultValues: {
            name: "",
            active: true,
        },
        mode: "onChange",
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["category", categoryId],
        queryFn: () => CategoryApi.getCategoryById(categoryId!),
        enabled: !!categoryId,
    });

    useEffect(() => {
        if (!isLoading && !data?.data) {
            ToastService.info("Category not found");
            navigate("/admin/categories/category-listing");
        }
    }, [data, isLoading, navigate]);

    useEffect(() => {
        if (data?.data) {
            reset({
                name: data.data.name,
                active: data.data.active,
            });
        }
    }, [data, reset]);

    if (isLoading) {
        return <PageLoader />;
    }

    if (isError) {
        return <ErrorState message={error.message} />;
    }

    const category = data?.data;

    const { mutate: updateCategory, isPending } = useMutation({
        mutationFn: (values: UpdateCategoryFormValues) => CategoryApi.updateCategory(categoryId!, values),
        onSuccess: response => {
            ToastService.success(response.message);

            queryClient.invalidateQueries({
                queryKey: ["categoryList"],
            });

            queryClient.invalidateQueries({
                queryKey: ["category", categoryId],
            });

            navigate("/admin/categories/category-listing");
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Category</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(values => updateCategory(values))} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Category Name</Label>
                            <Input id="name" disabled={isPending} {...register("name")} />
                            <FormError message={errors.name?.message} />
                        </div>

                        <div className="space-y-2">
                            <Label>Category Image</Label>
                            <Controller
                                name="categoryImage"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <Input
                                        type="file"
                                        disabled={isPending}
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={event => {
                                            const file = event.target.files?.[0];
                                            onChange(file);
                                        }}
                                    />
                                )}
                            />
                            <p className="text-xs text-muted-foreground">Leave empty to keep the current image.</p>
                            <FormError message={errors.categoryImage?.message} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Current Image</Label>
                        <img src={category?.imageUrl} alt={category?.name} className="h-20 w-32 rounded-md border object-cover" />
                    </div>

                    <div className="flex items-center gap-3">
                        <Controller name="active" control={control} render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
                        <Label>Active</Label>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" disabled={isPending} onClick={() => navigate("/admin/categories/category-listing")}>
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Updating..." : "Update Category"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default EditCategory;
