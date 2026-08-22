export const APP_NAME = 'E-Commerce';

export const APP_VERSION = '1.0.0';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const APP_CONFIG = {
    name: APP_NAME,
    version: APP_VERSION,
    baseUrl: API_BASE_URL,
} as const;
