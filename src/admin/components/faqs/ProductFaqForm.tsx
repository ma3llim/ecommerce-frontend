import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ProductApi } from "@/admin/api/Product.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import ToastService from "@/services/ToastService";
import type { CreateProductFaqRequest, ProductFaqResponse, UpdateProductFaqRequest } from "@/admin/types/products/ProductFaq.types";

interface ProductFaqFormProps {
    mode: "create" | "edit";
    faq?: ProductFaqResponse;
}

const ProductFaqForm = ({ mode, faq }: ProductFaqFormProps) => {
    const { productId, faqId } = useParams<{
        productId: string;
        faqId: string;
    }>();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        if (mode === "edit" && faq) {
            setQuestion(faq.question);
            setAnswer(faq.answer);
        }
    }, [mode, faq]);

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            if (!productId) {
                throw new Error("Product ID is required.");
            }

            if (mode === "create") {
                const data: CreateProductFaqRequest = {
                    question: question.trim(),
                    answer: answer.trim(),
                };
                return ProductApi.createProductFaq(productId, data);
            }

            if (!faqId) {
                throw new Error("FAQ ID is required.");
            }

            const data: UpdateProductFaqRequest = {
                question: question.trim(),
                answer: answer.trim(),
            };

            return ProductApi.updateProductFaq(productId, faqId, data);
        },

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["productFaqs", productId],
            });

            ToastService.success(response.message);
            navigate(`/admin/products/${productId}/faqs`);
        },

        onError: error => {
            ToastService.error(error.message);
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!question.trim() || !answer.trim()) {
            ToastService.error("Question and answer are required.");
            return;
        }

        mutate();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{mode === "create" ? "Create Product FAQ" : "Update Product FAQ"}</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="question">Question</Label>
                        <input
                            id="question"
                            type="text"
                            value={question}
                            onChange={event => setQuestion(event.target.value)}
                            placeholder="Enter FAQ question"
                            disabled={isPending}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="answer">Answer</Label>
                        <textarea
                            id="answer"
                            value={answer}
                            onChange={event => setAnswer(event.target.value)}
                            placeholder="Enter FAQ answer"
                            disabled={isPending}
                            required
                            rows={6}
                            className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </div>

                    <div className="flex justify-end gap-3 border-t pt-6">
                        <Button type="button" variant="outline" disabled={isPending} onClick={() => navigate(`/admin/products/${productId}/faqs`)}>
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? (mode === "create" ? "Creating..." : "Updating...") : mode === "create" ? "Create FAQ" : "Update FAQ"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ProductFaqForm;
