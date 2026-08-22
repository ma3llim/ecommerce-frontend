export const APP_NAME = 'E-Commerce';

export const APP_VERSION = '1.0.0';

export const BASE_URL = import.meta.env.BASE_URL;

export const APP_CONFIG = {
    name: APP_NAME,
    version: APP_VERSION,
    baseUrl: BASE_URL,
} as const;
