export enum ERROR_CODES {
  /**  ERROR CODE USER CLASS */
  USER_DUPLICATE_USERNAME = 'USER_DUPLICATE_USERNAME',
  USER_DUPLICATE_PHONE = 'USER_DUPLICATE_PHONE',
  USER_DUPLICATE_EMAIL = 'USER_DUPLICATE_EMAIL',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
  STOCK_DUPLICATE_CODE = 'STOCK_DUPLICATE_CODE',
  STOCK_NOT_FOUND = 'STOCK_NOT_FOUND',
  STOCK_DAILY_PRICES_DUPLICATE_STOCK_ID = 'STOCK_DAILY_PRICES_DUPLICATE_STOCK_ID',
  STOCK_DAILY_PRICES_DUPLICATE_EXCHANGE_DATE = 'STOCK_DAILY_PRICES_DUPLICATE_EXCHANGE_DATE'
}

export const HTTP_ERRORS = {
  /**  ERROR MESSAGE USER CLASS */
  [ERROR_CODES.USER_DUPLICATE_USERNAME]: {
    CODE: ERROR_CODES.USER_DUPLICATE_USERNAME,
    MESSAGE: 'User Duplicate Username.'
  },
  [ERROR_CODES.USER_DUPLICATE_PHONE]: {
    CODE: ERROR_CODES.USER_DUPLICATE_PHONE,
    MESSAGE: 'User Duplicate Phone Numbe.'
  },
  [ERROR_CODES.USER_DUPLICATE_EMAIL]: {
    CODE: ERROR_CODES.USER_DUPLICATE_EMAIL,
    MESSAGE: 'User Duplicate Email.'
  },
  [ERROR_CODES.USER_NOT_FOUND]: {
    CODE: ERROR_CODES.USER_NOT_FOUND,
    MESSAGE: 'User Not Found.'
  },
  [ERROR_CODES.INVALID_PASSWORD]: {
    CODE: ERROR_CODES.INVALID_PASSWORD,
    MESSAGE: 'Invalid password.'
  },
  [ERROR_CODES.SESSION_NOT_FOUND]: {
    CODE: ERROR_CODES.SESSION_NOT_FOUND,
    MESSAGE: 'Session Not Found.'
  },
  [ERROR_CODES.STOCK_DUPLICATE_CODE]: {
    CODE: ERROR_CODES.STOCK_DUPLICATE_CODE,
    MESSAGE: 'Stock Duplicate stock_code.'
  },
  [ERROR_CODES.STOCK_NOT_FOUND]: {
    CODE: ERROR_CODES.STOCK_NOT_FOUND,
    MESSAGE: 'Stock Not Found.'
  },
  [ERROR_CODES.STOCK_DAILY_PRICES_DUPLICATE_STOCK_ID]: {
    CODE: ERROR_CODES.STOCK_DAILY_PRICES_DUPLICATE_STOCK_ID,
    MESSAGE: 'Stock Daily Prices Duplicate stock_id.'
  },
  [ERROR_CODES.STOCK_DAILY_PRICES_DUPLICATE_EXCHANGE_DATE]: {
    CODE: ERROR_CODES.STOCK_DAILY_PRICES_DUPLICATE_EXCHANGE_DATE,
    MESSAGE: 'Stock Daily Prices Duplicate exchange_date.'
  }
};
