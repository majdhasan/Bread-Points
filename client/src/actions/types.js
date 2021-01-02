// ------------- Auth actions ------------------
export const AUTH_ATTEMPTING = 'AUTH_ATTEMPTING';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const CUSTOMER_LOGGED_OUT = 'CUSTOMER_LOGGED_OUT';
export const PROFILE_FETCHED = 'PROFILE_FETCHED';

// ------------- Registering actions ----------
export const SIGNUP_ATTEMPTING = 'SIGNUP_ATTEMPTING';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

// ------------- Transaction actions --------------
export const TRANSACTION_SAVED = 'TRANSACTION_SAVED';
export const TRANSACTION_RESET = 'TRANSACTION_RESET';
export const TRANSACTION_FETCHED = 'TRANSACTION_FETCHED';
export const TRANSACTION_FETCHING = 'TRANSACTION_FETCHING';
export const TRANSACTION_FETCHING_FAILED = 'TRANSACTION_FETCHING_FAILED';

// ------------- Order actions --------------
export const ORDER_SAVED = 'ORDER_SAVED';
export const ORDER_RESET = 'ORDER_RESET';
export const ORDER_FETCHED = 'ORDER_FETCHED';
export const ORDER_FETCHING = 'ORDER_FETCHING';
export const ORDER_FETCHING_FAILED = 'ORDER_FETCHING_FAILED';
export const PAYING_ORDER = 'PAYING_ORDER';
export const ORDER_PAID = 'ORDER_PAID';
export const ORDER_PAYING_FAILED = 'ORDER_PAYING_FAILED';
export const RESET_PAY_ORDER = 'RESET_PAY_ORDER';

// -------------- Error actions ---------------
export const ADD_ERROR = 'ADD_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

// -------------- Froms actions ---------------
export const OPEN_PAY_ORDER = 'OPEN_PAY_ORDER';
export const CLOSE_PAY_ORDER = 'CLOSE_PAY_ORDER';
export const OPEN_CREATE_ORDER = 'OPEN_CREATE_ORDER';
export const CLOSE_CREATE_ORDER = 'CLOSE_CREATE_ORDER';
