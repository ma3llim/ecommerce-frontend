export const ENDPOINTS = {
    SEARCH: (query: string) => `/products/search?query=${query}`,
    CATEGORIES: "/categories",
    SEND_CONTACT: "/contact",
    NEWSLETTER: "/newsletter",
    AUTH: {
        FORGOT_PASSWORD: "/auth/forgot-password",
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        REFRESH_TOKEN: "/auth/refresh-token",
        REGISTER: "/auth/register",
        RESEND_VERIFICATION: "/auth/resend-verification",
        RESET_PASSWORD: "/auth/reset-password",
        VERIFY_EMAIL: "/auth/verify-email",
    },
    USER: {
        ME: "/users/me",
        PASSWORD: "/users/me/password",
        PROFILE_IMAGE: "/users/me/profile-image",
    },
    ADDRESS: {
        BASE: "/users/me/addresses",
        DEFAULT_BILLING: (addressId: string) => `/users/me/addresses/${addressId}/default-billing`,
        DEFAULT_SHIPPING: (addressId: string) => `/users/me/addresses/${addressId}/default-shipping`,
        BY_ID: (addressId: string) => `/users/me/addresses/${addressId}`,
    },
    PRODUCT: {
        BASE: "/products",
        GET_BY_TAG: (tagSlug: string) => `/products/tag/${tagSlug}`,
        BY_SLUG: (productSlug: string) => `/products/${productSlug}`,
        GET_REVIEWS: (productSlug: string) => `/products/${productSlug}/reviews`,
    },
    CART: {
        BASE: "/cart",
        ITEMS: "/cart/items",
    },
    COUPON: {
        APPLY: "/coupons/apply",
    },
    ORDERS: {
        BASE: "/orders",
        GET_ORDER: (orderId: string) => `/orders/${orderId}`,
        CANCEL_ORDER: (orderId: string) => `/orders/${orderId}/cancel`,
    },
    PAYMENTS: {
        INITIATE: (orderId: string) => `/payments/${orderId}/payments`,
    },
    REVIEW: {
        GET: (productId: string, productVariantId: string) => `/reviews/product/${productId}/variant/${productVariantId}`,
        CREATE: "/reviews",
        UPDATE: (reviewId: string) => `/reviews/${reviewId}`,
        DELETE: (reviewId: string) => `/reviews/${reviewId}`,
        GET_PRODUCT_REVIEWS: (productSlug: string) => `/products/${productSlug}/reviews`,
    },
};
