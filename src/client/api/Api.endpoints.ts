export const ENDPOINTS = {
    SEARCH: (query: string) => `/products/search?query=${query}`,
    CATEGORIES: "/categories",
    SEND_CONTACT: "/contacts/send-contact",
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
};
