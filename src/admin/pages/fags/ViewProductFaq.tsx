import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { ProductApi } from "@/admin/api/Product.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";
import { Helmet } from "react-helmet-async";

const ViewProductFaqPage = () => {
    const { productId, faqId } = useParams<{ productId: string; faqId: string }>();
    const navigate = useNavigate();

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

    const faq = data.data;

    return (
        <>
            <Helmet>
                <title>FAQ Details | ecommerce</title>
                <meta name="description" content="View detailed information about a product frequently asked question." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">FAQ Details</h1>
                        <p className="text-sm text-muted-foreground">View product FAQ details.</p>
                    </div>
                    <Button type="button" variant="outline" onClick={() => navigate(`/admin/products/${productId}/faqs/${faqId}/edit`)}>
                        <Pencil className="mr-2 size-4" />
                        Edit
                    </Button>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-start justify-between gap-4">
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                        <Badge className={faq.active ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-700 hover:bg-red-100"}>
                            {faq.active ? "Active" : "Inactive"}
                        </Badge>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div>
                            <p className="mb-2 text-sm font-medium">Question</p>
                            <p className="text-sm leading-6">{faq.question}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium">Answer</p>
                            <p className="whitespace-pre-wrap text-sm leading-6">{faq.answer}</p>
                        </div>
                        <div className="grid gap-4 border-t pt-6 sm:grid-cols-2">
                            <div>
                                <p className="text-xs text-muted-foreground">Created At</p>
                                <p className="mt-1 text-sm">{new Date(faq.createdAt).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Updated At</p>
                                <p className="mt-1 text-sm">{new Date(faq.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="border-t pt-6">
                            <Button type="button" variant="outline" onClick={() => navigate(`/admin/products/${productId}/faqs`)}>
                                <ArrowLeft className="mr-2 size-4" />
                                Back to FAQs
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ViewProductFaqPage;
