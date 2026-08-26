export const ADMIN_ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        REFRESH: "/auth/refresh-token",
    },

    CATEGORY: {
        GET_ALL: "/admin/categories",
        GET: (categoryId: string) => `/admin/categories/${categoryId}`,
        CREATE: "/admin/categories",
        UPDATE: (categoryId: string) => `/admin/categories/${categoryId}`,
        DELETE: (categoryId: string) => `/admin/categories/${categoryId}`,
    },
    PRODUCTS: {
        GET_ALL: "/admin/products",
    },

    COUPON: {
        GET_ALL: "/admin/coupons",
        GET_BY_ID: (couponId: string) => `/admin/coupons/${couponId}`,
        CREATE: "/admin/coupons",
        UPDATE: (couponId: string) => `/admin/coupons/${couponId}`,
        DELETE: (couponId: string) => `/admin/coupons/${couponId}`,
        UPDATE_STATUS: (couponId: string) => `/admin/coupons/${couponId}`,
    },
} as const;
