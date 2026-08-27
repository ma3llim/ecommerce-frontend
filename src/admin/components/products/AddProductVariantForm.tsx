import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProductApi } from "@/admin/api/Product.api";
import FormError from "@/components/forms/FormError";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToastService from "@/services/ToastService";
import { productVariantSchema, type ProductVariantFormValues } from "@/admin/validation/products/ProductVariantSchema";
import type { productId } from "@/admin/types/products/ProductVariant.types";

const AddProductVariantForm = ({ productId }: { productId: productId }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductVariantFormValues>({
        resolver: yupResolver(productVariantSchema),
        defaultValues: {
            price: 0,
            stockQuantity: 0,
            attributes: [
                {
                    key: "",
                    value: "",
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "attributes",
    });

    const { mutate: createVariant, isPending } = useMutation({
        mutationFn: (values: ProductVariantFormValues) => {
            const attributes = values.attributes.reduce(
                (result, attribute) => {
                    if (attribute.key.trim()) {
                        result[attribute.key.trim()] = attribute.value.trim();
                    }

                    return result;
                },
                {} as Record<string, string>
            );

            return ProductApi.createProductVariant(productId!, {
                price: values.price,
                stockQuantity: values.stockQuantity,
                attributes,
            });
        },

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["productVariants", productId],
            });
            ToastService.success(response.message);
            navigate(`/admin/products/${productId}/variants`);
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    const onSubmit = (values: ProductVariantFormValues) => {
        createVariant(values);
    };

    return (
        <div className="mx-auto w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Variant Details</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>

                                <Input id="price" type="number" step="0.01" disabled={isPending} {...register("price")} />

                                <FormError message={errors.price?.message} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="stockQuantity">Stock Quantity</Label>

                                <Input id="stockQuantity" type="number" disabled={isPending} {...register("stockQuantity")} />

                                <FormError message={errors.stockQuantity?.message} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label>Attributes</Label>

                                    <p className="text-sm text-muted-foreground">Add variant attributes such as color, size, RAM, storage, etc.</p>
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
                                    Add Attribute
                                </Button>
                            </div>

                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-3">
                                    <div className="flex-1">
                                        <Input placeholder="Attribute name" disabled={isPending} {...register(`attributes.${index}.key`)} />
                                        <FormError message={errors.attributes?.[index]?.key?.message} />
                                    </div>

                                    <div className="flex-1">
                                        <Input placeholder="Attribute value" disabled={isPending} {...register(`attributes.${index}.value`)} />
                                        <FormError message={errors.attributes?.[index]?.value?.message} />
                                    </div>

                                    <Button type="button" variant="destructive" disabled={isPending || fields.length === 1} onClick={() => remove(index)}>
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" disabled={isPending} onClick={() => navigate(`/admin/products/${productId}/variants`)}>
                                Cancel
                            </Button>

                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Creating..." : "Create Variant"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddProductVariantForm;
