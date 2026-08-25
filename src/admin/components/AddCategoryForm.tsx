import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CategoryApi } from "../api/Category.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FormError from "@/components/forms/FormError";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { addCategorySchema, type AddCategoryFormValues } from "@/validation/admin/categories/CategorySchema";
import ToastService from "@/services/ToastService";

const AddCategoryForm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
        control,
        reset,
        setValue,
    } = useForm<AddCategoryFormValues>({
        resolver: yupResolver(addCategorySchema),
        defaultValues: {
            name: "",
            active: true,
        },
        mode: "onChange",
    });
    const { mutate, isPending } = useMutation({
        mutationFn: (data: AddCategoryFormValues) => {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("categoryImage", data.categoryImage);
            formData.append("active", String(data.active));

            return CategoryApi.addCategory(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categoryList"],
            });

            navigate("/admin/categories/category-listing");
        },
        onError: error => {
            ToastService.error(error.message);
        },
    });
    return (
        <form onSubmit={handleSubmit(data => mutate(data))} encType="multipart/form-data">
            <Card>
                <CardHeader>
                    <CardTitle>Category Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="flex gap-4">
                        <div className="space-y-2 w-full">
                            <Label htmlFor="name"> Category Name</Label>
                            <Input disabled={isPending} id="name" placeholder="Enter category name" {...register("name")} />
                            <FormError message={errors.name?.message} />
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="categoryImage">Category Image</Label>
                            <Controller
                                control={control}
                                name="categoryImage"
                                render={({ field }) => (
                                    <Input
                                        type="file"
                                        disabled={isPending}
                                        accept=".jpg,.jpeg,.png,.webp"
                                        onChange={e => {
                                            const file = e.target.files?.[0] ?? null;
                                            field.onChange(file);
                                        }}
                                        onBlur={field.onBlur}
                                        name={field.name}
                                        ref={field.ref}
                                    />
                                )}
                            />
                            <p className="text-xs text-muted-foreground">JPG, PNG or WebP. Maximum size 5MB.</p>

                            <FormError message={errors.categoryImage?.message} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="active">Active Category</Label>
                            <p className="text-sm text-muted-foreground">Make this category visible and available in the store.</p>
                        </div>

                        <Switch disabled={isPending} id="active" checked={watch("active")} onCheckedChange={checked => setValue("active", checked)} />
                    </div>

                    <div className="flex justify-end gap-3 border-t pt-6">
                        <Button disabled={isPending} type="button" variant="outline" onClick={() => reset()}>
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating..." : "Create Category"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
};

export default AddCategoryForm;
