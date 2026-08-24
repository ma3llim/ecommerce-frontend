export const ADMIN_ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        REFRESH: "/auth/refresh-token",
    },

    CATEGORY: {
        GET: "/admin/categories",
        POST: "/admin/categories",
        PUT: (categoryId: string) => `/admin/categories/${categoryId}`,
        DELETE: (categoryId: string) => `/admin/categories/${categoryId}`,
    },
} as const;
