import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductApi } from "@/admin/api/Product.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ToastService from "@/services/ToastService";
import type { ProductVariantResponse, UpdateProductVariantRequest } from "@/admin/types/products/ProductVariant.types";

const UpdateProductVariantForm = ({ variant }: { variant: ProductVariantResponse }) => {
    const { productId, variantId } = useParams<{ productId: string; variantId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [price, setPrice] = useState(String(variant.price));
    const [stockQuantity, setStockQuantity] = useState(String(variant.stockQuantity));
    const [attributes, setAttributes] = useState<{ key: string; value: string }[]>(
        Object.entries(variant.attributes ?? {}).map(([key, value]) => ({
            key,
            value: String(value),
        }))
    );

    const { mutate: updateVariant, isPending } = useMutation({
        mutationFn: (data: UpdateProductVariantRequest) => ProductApi.updateProductVariant(productId!, variantId!, data),
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

    const handleAttributeChange = (index: number, field: "key" | "value", value: string) => {
        setAttributes(previous =>
            previous.map((attribute, attributeIndex) =>
                attributeIndex === index
                    ? {
                          ...attribute,
                          [field]: value,
                      }
                    : attribute
            )
        );
    };

    const addAttribute = () => {
        setAttributes(previous => [
            ...previous,
            {
                key: "",
                value: "",
            },
        ]);
    };

    const removeAttribute = (index: number) => {
        setAttributes(previous => previous.filter((_, attributeIndex) => attributeIndex !== index));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!productId || !variantId) {
            return;
        }

        const formattedAttributes = attributes.reduce<Record<string, string>>((result, attribute) => {
            if (attribute.key.trim()) {
                result[attribute.key.trim()] = attribute.value;
            }

            return result;
        }, {});

        const data: UpdateProductVariantRequest = {
            price: Number(price),
            stockQuantity: Number(stockQuantity),
            attributes: formattedAttributes,
        };

        updateVariant(data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Product Variant</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={price}
                            onChange={event => setPrice(event.target.value)}
                            required
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="stockQuantity">Stock Quantity</Label>

                        <input
                            id="stockQuantity"
                            type="number"
                            min="0"
                            value={stockQuantity}
                            onChange={event => setStockQuantity(event.target.value)}
                            required
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Attributes</Label>

                            <Button type="button" variant="outline" size="sm" onClick={addAttribute} disabled={isPending}>
                                Add Attribute
                            </Button>
                        </div>

                        {attributes.map((attribute, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="Key"
                                    value={attribute.key}
                                    onChange={event => handleAttributeChange(index, "key", event.target.value)}
                                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />

                                <input
                                    type="text"
                                    placeholder="Value"
                                    value={attribute.value}
                                    onChange={event => handleAttributeChange(index, "value", event.target.value)}
                                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />

                                {attributes.length > 1 && (
                                    <Button type="button" variant="destructive" size="sm" onClick={() => removeAttribute(index)} disabled={isPending}>
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-3 border-t pt-6">
                        <Button type="button" variant="outline" disabled={isPending} onClick={() => navigate(`/admin/products/${productId}/variants`)}>
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Updating..." : "Update Variant"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default UpdateProductVariantForm;
