import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import type { ProductFaq } from "@/client/types/Product.types";

interface ProductFaqsProps {
    faqs?: ProductFaq[];
}

const ProductFaqs = ({ faqs = [] }: ProductFaqsProps) => {
    if (!faqs.length) {
        return null;
    }

    return (
        <section className="border-t py-8">
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <Accordion className="mt-5">
                {faqs.map(faq => (
                    <AccordionItem key={faq.productFaqId} value={faq.productFaqId}>
                        <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>

                        <AccordionContent className="leading-7 text-muted-foreground text-base">{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
};

export default ProductFaqs;
