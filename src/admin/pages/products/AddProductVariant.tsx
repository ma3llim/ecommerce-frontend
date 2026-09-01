import AddProductVariantForm from "@/admin/components/products/AddProductVariantForm";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const AddProductVariant = () => {
    const { productId } = useParams<{ productId: string }>();

    if (!productId) {
        return <div className="p-6 text-sm text-destructive">Product ID is missing.</div>;
    }

    return (
        <>
            <Helmet>
                <title>Add Product Variant | Admin</title>
                <meta name="description" content="Create and add a new variant for an ecommerce product." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full max-w-5xl space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Add Product Variant</h1>

                    <p className="text-sm text-muted-foreground">Create a new variant for this product.</p>
                </div>

                <AddProductVariantForm productId={productId} />
            </div>
        </>
    );
};

export default AddProductVariant;
