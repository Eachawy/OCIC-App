const config = {
  VERSION: process.env.VERSION
};

export default config;
export const SERVER_API_URL = process.env.SERVER_API_URL;
export const API_KEY = process.env.API_KEY;
export const ENCRYPTION_PUBLIC_KEY = process.env.ENCRYPTION_PUBLIC_KEY;
export const ENCRYPTION_PRIVATE_KEY = process.env.ENCRYPTION_PRIVATE_KEY;
export const IS_REQUEST_ENCRYPTION_ENABLED = process.env.IS_REQUEST_ENCRYPTION_ENABLED;
export const CRYPTO_SECRET_KEY = process.env.CRYPTO_SECRET_KEY;
export const SUB_DOMAIN = process.env.SUB_DOMAIN;
export const GOOGLE_RECAPTCHA_SITE_KEY = process.env.GOOGLE_RECAPTCHA_SITE_KEY;
export const Action = {
  ISSUE_THEORY_EXAM: 'ISSUE_THEORY_EXAM',
  CHANGE_THEORY_EXAM: 'CHANGE_THEORY_EXAM',
  ISSUE_YARD_EXAM: 'ISSUE_YARD_EXAM',
  CHANGE_YARD_EXAM: 'CHANGE_YARD_EXAM',
  ISSUE_ROAD_EXAM: 'ISSUE_ROAD_EXAM',
  CHANGE_ROAD_EXAM: 'CHANGE_ROAD_EXAM'
};
export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
  ANONYMOUS: 'ROLE_ANONYMOUS'
};

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error'
};

export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDThh:mm';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';
export const APP_API_USER = 'admin';
export const APP_API_PASS = 'admin';

export const AUTH_TOKEN_KEY = 'vls-authenticationToken';
export const AUTH_TOKEN_KEY_VERIFIED = 'vls-verifiedAuthenticationToken';
export const APP_ID_KEY = 'applicationID';
export const APP_PARAMETERS = 'param';
export const API_URL_ACCESS_TOKEN = 'auth/login';
export const API_URL_GET_CUSTOMER_BY_UNIFIED_ID = 'api/customer/nationalId/';
export const API_URL_GET_CUSTOMER_VEHICLES = 'api/vehicles/summary/list/trafficCodeNo/';
export const ADI_URL_LOAD_JOURNEY = 'api/customer/journeys';
