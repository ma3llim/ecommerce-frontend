import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductVariantImages from "./ProductVariantImages";
import type { ProductVariant } from "@/admin/types/products/Product.types";

interface ProductVariantsProps {
    variants: ProductVariant[];
    defaultVariantId: string;
}

const ProductVariants = ({ variants, defaultVariantId }: ProductVariantsProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Variants ({variants.length})</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {!variants.length ? (
                    <p className="text-sm text-muted-foreground">No variants available.</p>
                ) : (
                    variants.map(variant => {
                        const isDefault = variant.id === defaultVariantId;

                        return (
                            <div key={variant.id} className="rounded-xl border">
                                <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="font-semibold">{variant.sku}</h3>

                                            {isDefault && <Badge>Default</Badge>}

                                            <Badge variant={variant.active ? "default" : "secondary"}>{variant.active ? "Active" : "Inactive"}</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5 p-5">
                                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                        <div>
                                            <p className="text-sm text-muted-foreground">SKU</p>
                                            <p className="mt-1 font-medium">{variant.sku}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-muted-foreground">Price</p>
                                            <p className="mt-1 font-medium">₹{variant.price.toLocaleString("en-IN")}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-muted-foreground">Stock</p>
                                            <p className="mt-1 font-medium">{variant.stockQuantity}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">Attributes</p>
                                        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {Object.entries(variant.attributes ?? {}).map(([key, value]) => (
                                                <div key={key} className="rounded-lg border bg-muted/20 px-4 py-3">
                                                    <p className="text-xs text-muted-foreground">{key}</p>

                                                    <p className="mt-1 text-sm font-medium">{value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="mb-3 text-sm font-medium">Variant Images</p>
                                        <ProductVariantImages images={variant.images} />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
};

export default ProductVariants;
