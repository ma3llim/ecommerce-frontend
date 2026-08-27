import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { ProductApi } from "@/admin/api/Product.api";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";
import ProductFaqForm from "@/admin/components/faqs/ProductFaqForm";

const EditProductFaqPage = () => {
    const { productId, faqId } = useParams<{ productId: string; faqId: string }>();

    const { data, isLoading, error } = useQuery({
        queryKey: ["productFaq", productId, faqId],
        queryFn: () => ProductApi.getProductFaq(productId!, faqId!),
        enabled: !!productId && !!faqId,
    });

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return <ErrorState message={error.message} />;
    }

    if (!data?.data) {
        return <ErrorState message="FAQ not found." />;
    }

    return (
        <div className="mx-auto w-full">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Edit Product FAQ</h1>
                <p className="text-sm text-muted-foreground">Update the question and answer.</p>
            </div>

            <ProductFaqForm mode="edit" faq={data.data} />
        </div>
    );
};

export default EditProductFaqPage;
