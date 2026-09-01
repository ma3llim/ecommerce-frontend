import { ContactApi } from "@/admin/api/Contact.api";
import { DataTable, DataTableRowActions } from "@/admin/components/table";
import type { ContactListItem } from "@/admin/types/Contact.types";
import type { PaginationRequest } from "@/types/common/Pagination.types";
import { formatDate } from "@/utils/Time";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
    const navigate = useNavigate();
    const [pagination, setPagination] = useState<PaginationRequest>({
        page: 0,
        size: 10,
    });

    const { data, isLoading } = useQuery({
        queryKey: ["admin-contacts", pagination],
        queryFn: () => ContactApi.getContacts(pagination),
    });

    const ContactColumns: ColumnDef<ContactListItem>[] = [
        {
            accessorKey: "firstName",
            header: "Name",
            cell: ({ row }) => (
                <span className="font-medium">
                    {row.original.firstName} {row.original.lastName}
                </span>
            ),
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "subject",
            header: "Subject",
            cell: ({ row }) => <span className="line-clamp-1 max-w-75">{row.original.subject}</span>,
        },
        {
            accessorKey: "createdAt",
            header: "Received",
            cell: ({ row }) => formatDate(row.original.createdAt),
        },
        {
            id: "actions",
            header: "Actions",
            enableSorting: false,
            enableHiding: false,
            cell: ({ row }) => {
                const contact = row.original;

                return (
                    <DataTableRowActions
                        actions={[
                            {
                                label: "View",
                                icon: Eye,
                                variant: "info",
                                onClick: () => navigate(`/admin/contacts/contact-details/${contact.id}`),
                            },
                        ]}
                    />
                );
            },
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Contact Messages</h1>

                <p className="mt-1 text-muted-foreground">Manage messages submitted through the contact form.</p>
            </div>

            <DataTable
                columns={ContactColumns}
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
        </div>
    );
};

export default Contacts;
