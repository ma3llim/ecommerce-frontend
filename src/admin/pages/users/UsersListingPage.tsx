import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Power } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { UserApi } from "@/admin/api/User.api";
import type { AccountStatus, UserListResponse } from "@/admin/types/users/User.types";
import { Badge } from "@/components/ui/badge";
import PageLoader from "@/components/common/PageLoader";
import ErrorState from "@/components/common/ErrorState";
import { DataTable, DataTableRowActions } from "@/admin/components/table";
import ToastService from "@/services/ToastService";
import { Helmet } from "react-helmet-async";

const UsersListingPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
    });
    const [search, setSearch] = useState("");
    const [accountStatus, setAccountStatus] = useState<AccountStatus | undefined>();

    const { data, isLoading, error } = useQuery({
        queryKey: ["users", pagination.page, pagination.size, search, accountStatus],
        queryFn: () =>
            UserApi.getUsers({
                page: pagination.page,
                size: pagination.size,
                search: search || undefined,
                accountStatus,
            }),
    });

    const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
        mutationFn: ({ userId, accountStatus }: { userId: string; accountStatus: AccountStatus }) =>
            UserApi.updateUserStatus(userId, {
                accountStatus,
            }),
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            ToastService.success(response.message);
        },
        onError: error => {
            ToastService.error(error.message);
        },
    });
    const users = data?.data?.content ?? [];

    const columns: ColumnDef<UserListResponse>[] = [
        {
            accessorKey: "fullName",
            header: "Name",
            cell: ({ row }) => <div className="font-medium">{row.original.fullName}</div>,
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phoneNumber",
            header: "Phone",
        },
        {
            accessorKey: "accountStatus",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.accountStatus;
                return (
                    <Badge variant={status === "ACTIVE" ? "default" : status === "PENDING" ? "secondary" : status === "LOCKED" ? "destructive" : "outline"}>
                        {status}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
        },
        {
            id: "actions",
            accessorKey: "Actions",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <DataTableRowActions
                        actions={[
                            {
                                label: "View",
                                icon: Eye,
                                variant: "info",
                                disabled: isUpdatingStatus,
                                onClick: () => navigate(`/admin/users/user-details/${user.id}`),
                            },
                            ...(user.role !== "ADMIN"
                                ? [
                                      {
                                          label: user.accountStatus === "ACTIVE" ? "Disable" : "Activate",

                                          icon: Power,
                                          variant: "warning" as const,

                                          disabled: isUpdatingStatus,

                                          onClick: () =>
                                              updateStatus({
                                                  userId: user.id,
                                                  accountStatus: user.accountStatus === "ACTIVE" ? "DISABLED" : "ACTIVE",
                                              }),
                                      },
                                  ]
                                : []),
                        ]}
                    />
                );
            },
        },
    ];

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return <ErrorState message={error.message} />;
    }

    return (
        <>
            <Helmet>
                <title>User Listing | Admin</title>
                <meta name="description" content="View and manage customer accounts, user information, and account status in the ecommerce admin panel." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="mx-auto w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight">Users</h1>

                    <p className="text-sm text-muted-foreground">Manage registered users and their account status.</p>
                </div>

                <div className="mb-4 flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={event => {
                            setSearch(event.target.value);

                            setPagination(previous => ({
                                ...previous,
                                page: 0,
                            }));
                        }}
                        className="h-9 w-full max-w-sm rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />

                    <select
                        value={accountStatus ?? ""}
                        onChange={event => {
                            const value = event.target.value as AccountStatus | "";

                            setAccountStatus(value === "" ? undefined : value);

                            setPagination(previous => ({
                                ...previous,
                                page: 0,
                            }));
                        }}
                        className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                    >
                        <option value="">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="ACTIVE">Active</option>
                        <option value="LOCKED">Locked</option>
                        <option value="DISABLED">Disabled</option>
                    </select>
                </div>

                <DataTable
                    columns={columns}
                    data={users}
                    loading={isLoading}
                    page={data?.data?.page ?? pagination.page}
                    size={data?.data?.size ?? pagination.size}
                    totalElements={data?.data?.totalElements ?? 0}
                    totalPages={data?.data?.totalPages ?? 0}
                    onPageChange={page =>
                        setPagination(previous => ({
                            ...previous,
                            page,
                        }))
                    }
                    showPagination={true}
                />
            </div>
        </>
    );
};

export default UsersListingPage;
