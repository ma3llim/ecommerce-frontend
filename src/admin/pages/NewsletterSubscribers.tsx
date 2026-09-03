import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { NewsletterApi } from "@/admin/api/Newsletter.api";
import type { NewsletterSubscriber } from "@/admin/types/Newsletter.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/Time";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import { DataTable } from "../components/table";
import { Helmet } from "react-helmet-async";

const NewsletterSubscribers = () => {
    const [pagination, setPagination] = useState<PaginationRequest>({
        page: 0,
        size: 10,
    });

    const { data, isLoading } = useQuery({
        queryKey: ["admin-newsletter-subscribers", pagination],
        queryFn: () => NewsletterApi.getSubscribers(pagination),
    });

    const NewsletterColumns: ColumnDef<NewsletterSubscriber>[] = [
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <span className="font-medium">{row.original.email}</span>,
        },

        {
            accessorKey: "createdAt",
            header: "Subscribed",
            cell: ({ row }) => formatDate(row.original.createdAt),
        },
    ];

    return (
        <>
            <Helmet>
                <title>Newsletter Subscribers | Admin</title>
                <meta name="description" content="View and manage newsletter subscribers in the ecommerce admin panel." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <Card>
                <CardHeader>
                    <CardTitle>Newsletter Subscribers</CardTitle>
                    <CardDescription>View users subscribed to the newsletter.</CardDescription>
                </CardHeader>

                <CardContent>
                    <DataTable
                        columns={NewsletterColumns}
                        data={data?.data.content ?? []}
                        loading={isLoading}
                        page={data?.data.page ?? 0}
                        size={data?.data.size ?? 10}
                        totalElements={data?.data.totalElements ?? 0}
                        totalPages={data?.data.totalPages ?? 0}
                        onPageChange={page => {
                            setPagination(prev => ({
                                ...prev,
                                page,
                            }));
                        }}
                    />
                </CardContent>
            </Card>
        </>
    );
};

export default NewsletterSubscribers;
