export const ADMIN_ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        REFRESH: "/auth/refresh-token",
    },

    CATEGORY: {
        GET_ALL: "/admin/categories",
        GET_CATEGORY_ALL: "/admin/categories/category-list",
        GET: (categoryId: string) => `/admin/categories/${categoryId}`,
        CREATE: "/admin/categories",
        UPDATE: (categoryId: string) => `/admin/categories/${categoryId}`,
        DELETE: (categoryId: string) => `/admin/categories/${categoryId}`,
    },
    PRODUCTS: {
        GET_ALL: "/admin/products",
        CREATE: "/admin/products",
        GET_BY_ID: (productId: string) => `/admin/products/${productId}`,
        UPDATE_PRODUCT_STATUS: (productId: string) => `admin/products/${productId}/status`,
        UPDATE_PRODUCT: (productId: string) => `/admin/products/${productId}`,
        DELETE: (productId: string) => `/admin/products/${productId}`,
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
