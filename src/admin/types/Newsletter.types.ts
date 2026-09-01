import type { PageResponse } from "@/types/common/PageResponse.types";

export interface NewsletterSubscriber {
    id: string;
    email: string;
    createdAt: string;
}

export type NewsletterSubscriberResponse = PageResponse<NewsletterSubscriber>;
