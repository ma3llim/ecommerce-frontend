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
        GET_OPTIONS: "/admin/products/options",
        GET_PRODUCT_TAG: "/admin/products/product-tags/options",
        GET_BY_ID: (productId: string) => `/admin/products/${productId}`,
        UPDATE_PRODUCT_STATUS: (productId: string) => `admin/products/${productId}/status`,
        UPDATE_PRODUCT: (productId: string) => `/admin/products/${productId}`,
        DELETE: (productId: string) => `/admin/products/${productId}`,
        ASSIGN_TAG_TO_PRODUCT: (productId: string, tagId: string) => `/admin/products/${productId}/tags/${tagId}`,
        REMOVE_TAG_TO_PRODUCT: (productId: string, tagId: string) => `/admin/products/${productId}/tags/${tagId}`,
        GET_VARIANT: (productId: string, variantId: string) => `/admin/products/${productId}/variants/${variantId}`,
        GET_VARIANTS: (productId: string) => `/admin/products/${productId}/variants`,
        CREATE_VARIANT: (productId: string) => `/admin/products/${productId}/variants`,
        UPDATE_VARIANT: (productId: string, variantId: string) => `/admin/products/${productId}/variants/${variantId}`,
        DELETE_VARIANT: (productId: string, variantId: string) => `/admin/products/${productId}/variants/${variantId}`,
        UPDATE_VARIANT_STATUS: (productId: string, variantId: string) => `/admin/products/${productId}/variants/${variantId}/status`,
        UPLOAD_VARIANT_IMAGES: (productId: string, variantId: string) => `/admin/products/${productId}/variants/${variantId}/images`,
        DELETE_VARIANT_IMAGE: (productId: string, variantId: string, imageVariantId: string) =>
            `/admin/products/${productId}/variants/${variantId}/images/${imageVariantId}`,
        REPLACE_VARIANT_IMAGE: (productId: string, variantId: string, variantImageId: string) =>
            `/admin/products/${productId}/variants/${variantId}/images/${variantImageId}`,
        SET_VARIANT_IMAGE_PRIMARY: (productId: string, variantId: string, variantImageId: string) =>
            `/admin/products/${productId}/variants/${variantId}/images/${variantImageId}/primary`,
        REORDER_VARIANT_IMAGES: (productId: string, variantId: string) => `/admin/products/${productId}/variants/${variantId}/images/reorder`,
    },

    FAQS: {
        GET_FAQS: (productId: string) => `/admin/products/${productId}/faqs`,
        GET_FAQ: (productId: string, faqId: string) => `/admin/products/${productId}/faqs/${faqId}`,
        CREATE_FAQ: (productId: string) => `/admin/products/${productId}/faqs`,
        UPDATE_FAQ: (productId: string, faqId: string) => `/admin/products/${productId}/faqs/${faqId}`,
        DELETE_FAQ: (productId: string, faqId: string) => `/admin/products/${productId}/faqs/${faqId}`,
        UPDATE_FAQ_STATUS: (productId: string, faqId: string) => `/admin/products/${productId}/faqs/${faqId}/status`,
    },

    USERS: {
        GET_USERS: "/admin/users",
        GET_USER_DETAILS: (userId: string) => `/admin/users/${userId}`,
        UPDATE_USER_STATUS: (userId: string) => `/admin/users/${userId}/status`,
    },

    TAGS: {
        GET_ALL: "/admin/tags",
        CREATE: "/admin/tags",
        GET_OPTIONS: "/admin/tags/options",
        GET_BY_ID: (tagId: string) => `/admin/tags/${tagId}`,
        UPDATE: (tagId: string) => `/admin/tags/${tagId}`,
        DELETE: (tagId: string) => `/admin/tags/${tagId}`,
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
