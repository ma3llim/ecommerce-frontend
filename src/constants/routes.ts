export const ROUTES = {
    HOME: '/',

    AUTH: {
        LOGIN: '/login',
        FORGOT_PASSWORD: '/forgot-password',
        RESET_PASSWORD: '/reset-password',
    },

    ADMIN: {
        ROOT: '/admin',
        LOGIN: '/admin/login',
        DASHBOARD: '/admin',
        PRODUCTS: '/admin/products',
        CATEGORIES: '/admin/categories',
        ORDERS: '/admin/orders',
        USERS: '/admin/users',
        SETTINGS: '/admin/settings',
    },

    USER: {
        ROOT: '/shop',
        PRODUCTS: '/shop/products',
        CART: '/cart',
        CHECKOUT: '/checkout',
        ORDERS: '/orders',
        PROFILE: '/profile',
    },
} as const;
