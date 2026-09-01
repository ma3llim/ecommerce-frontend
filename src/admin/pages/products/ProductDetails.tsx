import { ProductApi } from "@/admin/api/Product.api";
import ProductSpecifications from "@/admin/components/products/ProductSpecifications";
import PageLoader from "@/components/common/PageLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ProductVariants from "./ProductVariants";

const ProductDetails = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["admin-product", productId],
        queryFn: () => ProductApi.getProductById(productId!),
        enabled: Boolean(productId),
    });

    const product = data?.data;

    if (isLoading) {
        return <PageLoader />;
    }

    if (isError || !product) {
        return (
            <div className="flex min-h-96 flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-bold">Product not found</h1>
                <p className="mt-2 text-muted-foreground">We couldn't load this product.</p>
                <Button className="mt-5" onClick={() => navigate("/admin/products/product-listing")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Product Details</h1>
                    <p className="mt-1 text-muted-foreground">View product information and variants.</p>
                </div>
                <Button variant="outline" onClick={() => navigate("/admin/products/product-listing")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>{product.name}</CardTitle>
                            <CardDescription>{product.slug}</CardDescription>
                        </div>
                        <Badge variant={product.active ? "default" : "secondary"}>{product.active ? "Active" : "Inactive"}</Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-muted-foreground">Category</p>
                            <p className="mt-1 font-medium">{product.category.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Default Variant</p>
                            <p className="mt-1 font-medium">{product.defaultVariantId ? "Available" : "Not Available"}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Description</p>

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{product.description}</p>
                    </div>
                </CardContent>
            </Card>

            <ProductSpecifications specifications={product.specifications} />

            <ProductVariants variants={product.variants} defaultVariantId={product.defaultVariantId!} />
        </div>
    );
};

export default ProductDetails;
