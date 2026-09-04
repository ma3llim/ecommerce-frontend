import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface FaqItem {
    id: string;
    title?: string;
    description?: string;
    question?: string;
    answer?: string;
}

interface FaqProps {
    lists: FaqItem[];
}

const Faq = ({ lists }: FaqProps) => {
    return (
        <>
            {lists.map(list => (
                <Accordion key={list.id} className="my-5 rounded-md border-none transition-all duration-300 ease-in-out">
                    <AccordionItem value={`item-${list.id}`} className="border-b last:border-b-0">
                        <AccordionTrigger className="rounded-md bg-gray-200 p-4 text-lg font-semibold uppercase text-gray-800 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                            {list.title || list.question}
                        </AccordionTrigger>

                        <AccordionContent className="rounded-b-md bg-gray-100 px-4 py-4 text-base text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                            {list.description || list.answer}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}
        </>
    );
};

export default Faq;
