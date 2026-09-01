export interface DashboardSummary {
    totalUsers: number;
    totalProducts: number;
    totalCategories: number;
    totalOrders: number;
    totalReviews: number;
    totalCoupons: number;
    totalPayments: number;
}

export interface OrderStatistics {
    status: string;
    count: number;
}

export interface ProductStatistics {
    category: string;
    count: number;
}

export interface UserStatistics {
    period: string;
    count: number;
}
