// cannot use destructuring here as this is parsed by parcel
/* eslint prefer-destructuring: 0 */

export const HTTP_ENDPOINT = process.env.HTTP_ENDPOINT;
export const OREA_VALIDATION_ENDPOINT = process.env.OREA_VALIDATION_ENDPOINT || '';
export const WS_ENDPOINT = process.env.WS_ENDPOINT;
export const STATIC_SERVER = process.env.STATIC_SERVER || '';
export const GTMID = process.env.GTMID || '';
export const UPLOAD_ENDPOINT = process.env.UPLOAD_ENDPOINT;
export const DOWNLOAD_ENDPOINT = process.env.DOWNLOAD_ENDPOINT;
export const LOGLEVEL = process.env.LOGLEVEL;
export const VERSION_NUMBER = process.env.VERSION_NUMBER || '0.1';
export const DEBOUNCE_TABLE_REFETCH_MS = process.env.DEBOUNCE_TABLE_REFETCH_MS;
export const DEBOUNCE_TIMEOUT = process.env.DEBOUNCE_TIMEOUT;
export const REDIRECTION_TIMEOUT = process.env.REDIRECTION_TIMEOUT;
export const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY;
export const SHOW_CAPTCHA = process.env.SHOW_CAPTCHA;
export const ENVIRONMENT = process.env.ENVIRONMENT;
