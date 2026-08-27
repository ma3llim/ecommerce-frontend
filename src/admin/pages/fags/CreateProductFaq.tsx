import ProductFaqForm from "@/admin/components/faqs/ProductFaqForm";
import { useParams } from "react-router-dom";

const CreateProductFaqPage = () => {
    const { productId } = useParams<{ productId: string }>();

    if (!productId) {
        return null;
    }

    return (
        <div className="mx-auto w-full">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Add Product FAQ</h1>

                <p className="text-sm text-muted-foreground">Create a frequently asked question for this product.</p>
            </div>

            <ProductFaqForm mode="create" />
        </div>
    );
};

export default CreateProductFaqPage;
