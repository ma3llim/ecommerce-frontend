import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ProductApi } from "@/admin/api/Product.api";
import UpdateProductVariantForm from "@/admin/components/products/UpdateProductVariantForm";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";

const EditProductVariant = () => {
    const { productId, variantId } = useParams<{
        productId: string;
        variantId: string;
    }>();

    const { data, isLoading, error } = useQuery({
        queryKey: ["productVariants", productId, variantId],
        queryFn: () => ProductApi.getProductVariant(productId!, variantId!),
        enabled: !!productId,
    });

    if (isLoading) {
        return <PageLoader />;
    }

    if (!data?.data) {
        return <ErrorState message={error?.message} />;
    }

    return (
        <div className="mx-auto w-full">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Edit Product Variant</h1>
                <p className="text-sm text-muted-foreground">Update price, stock quantity and variant attributes.</p>
            </div>

            <UpdateProductVariantForm variant={data.data} />
        </div>
    );
};

export default EditProductVariant;
