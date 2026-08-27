import ProductFaqForm from "@/admin/components/faqs/ProductFaqForm";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const CreateProductFaqPage = () => {
    const { productId } = useParams<{ productId: string }>();

    if (!productId) {
        return null;
    }

    return (
        <>
            <Helmet>
                <title>Add FAQ | ecommerce</title>
                <meta name="description" content="Create a new frequently asked question for an ecommerce product." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">Add Product FAQ</h1>

                    <p className="text-sm text-muted-foreground">Create a frequently asked question for this product.</p>
                </div>

                <ProductFaqForm mode="create" />
            </div>
        </>
    );
};

export default CreateProductFaqPage;
