import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { DashboardApi } from "../api/DashboardApi";
import PageLoader from "@/components/common/PageLoader";
import ToastService from "@/services/ToastService";
import { Box, ChartBar, ClipboardList, MessageSquare, Tags, Users, WalletCards } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#a855f7", "#6366f1", "#ec4899", "#22d3ee", "#84cc16"];
const Dashboard = () => {
    const {
        data: summary,
        isLoading: isSummaryLoading,
        isError: isSummaryError,
    } = useQuery({
        queryKey: ["dashboard", "summary"],
        queryFn: DashboardApi.getSummary,
    });

    const {
        data: orderStatistics = [],
        isLoading: isOrderStatisticsLoading,
        isError: isOrderStatisticsError,
    } = useQuery({
        queryKey: ["dashboard", "order-statistics"],
        queryFn: DashboardApi.getOrderStatistics,
    });

    const {
        data: productStatistics = [],
        isLoading: isProductStatisticsLoading,
        isError: isProductStatisticsError,
    } = useQuery({
        queryKey: ["dashboard", "product-statistics"],
        queryFn: DashboardApi.getProductStatistics,
    });

    const {
        data: userStatistics = [],
        isLoading: isUserStatisticsLoading,
        isError: isUserStatisticsError,
    } = useQuery({
        queryKey: ["dashboard", "user-statistics"],
        queryFn: DashboardApi.getUserStatistics,
    });
    if (isSummaryLoading || isOrderStatisticsLoading || isProductStatisticsLoading || isUserStatisticsLoading) {
        return <PageLoader />;
    }

    if (isSummaryError || isOrderStatisticsError || isProductStatisticsError || isUserStatisticsError) {
        ToastService.error("Failed to load dashboard data.");
    }

    const cards = [
        {
            label: "Users",
            count: summary?.totalUsers ?? 0,
            icon: Users,
        },
        {
            label: "Products",
            count: summary?.totalProducts ?? 0,
            icon: Box,
        },
        {
            label: "Categories",
            count: summary?.totalCategories ?? 0,
            icon: Tags,
        },
        {
            label: "Orders",
            count: summary?.totalOrders ?? 0,
            icon: ClipboardList,
        },
        {
            label: "Reviews",
            count: summary?.totalReviews ?? 0,
            icon: MessageSquare,
        },
        {
            label: "Coupons",
            count: summary?.totalCoupons ?? 0,
            icon: ChartBar,
        },
        {
            label: "Payments",
            count: summary?.totalPayments ?? 0,
            icon: WalletCards,
        },
    ];
    return (
        <>
            <Helmet>
                <title>Admin Dashboard | ecommerce</title>
                <meta name="description" content="Admin dashboard for managing products, orders, users, payments, and other ecommerce operations." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your ecommerce operations and statistics.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 select-none">
                    {cards.map(card => {
                        const Icon = card.icon;
                        return (
                            <Card
                                key={card.label}
                                className="w-full border p-3 rounded-md shadow-lg flex flex-col transition-transform transform hover:scale-105 space-y-1"
                            >
                                <div className="flex items-center gap-3 text-3xl font-semibold">
                                    <Icon size={25} />
                                    <h4>{card.count}</h4>
                                </div>
                                <p className="text-lg font-bold">{card.label}</p>
                            </Card>
                        );
                    })}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>User Statistics</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={userStatistics}>
                                <XAxis dataKey="period" />
                                <YAxis allowDecimals={false} />
                                <Tooltip
                                    cursor={{
                                        fill: "hsl(var(--muted))",
                                        opacity: 0.2,
                                    }}
                                />
                                <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} activeBar={false} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Order Status Distribution</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {orderStatistics.length > 0 ? (
                            <ResponsiveContainer width="100%" height={320}>
                                <PieChart>
                                    <Pie
                                        data={orderStatistics}
                                        dataKey="count"
                                        nameKey="status"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={105}
                                        label={({ payload, percent }) => `${payload?.status ?? ""}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                                    >
                                        {orderStatistics.map((_, index) => (
                                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>

                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-80 items-center justify-center text-muted-foreground">No order statistics available.</div>
                        )}
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Products by Category</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {productStatistics.length > 0 ? (
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={productStatistics}>
                                    <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                                    <YAxis allowDecimals={false} />

                                    <Tooltip
                                        cursor={{
                                            fill: "hsl(var(--muted))",
                                            opacity: 0.2,
                                        }}
                                    />

                                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                        {productStatistics.map((_, index) => (
                                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-87.5 items-center justify-center text-muted-foreground">No product statistics available.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Dashboard;
