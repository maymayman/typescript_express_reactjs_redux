import { Dialect } from 'sequelize';

export const MY_SQL_HOST = process.env.MY_SQL_HOST || 'localhost';
export const MY_SQL_USER = process.env.MY_SQL_USER || 'root';
export const MY_SQL_PASSWORD = process.env.MY_SQL_PASSWORD || 'my-secret-pw';
export const MY_SQL_DATABASE_NAME = process.env.MY_SQL_DATABASE_NAME || 'stock_develop';
export const SQL_DIALECT = (process.env.SQL_DIALECT as Dialect) || 'mysql';
export const MY_SQL_PORT = process.env.MY_SQL_PORT
  ? parseInt(process.env.MY_SQL_PORT, 10) 
  : 3306;
export const SECRET_KEY = process.env.SECRET_KEY || 'My_secret_key';
export const EXPIRE_TOKEN_TIME = process.env.EXPIRE_TOKEN_TIME
  ? parseInt(process.env.EXPIRE_TOKEN_TIME, 10) 
  : 30 * 24 * 60 * 60;
export const ENABLE_JOB = process.env.ENABLE_JOB
  ? parseInt(process.env.ENABLE_JOB, 10) 
  : 0;
export const NUMBER_SUBTRACT_MOMENT = process.env.NUMBER_SUBTRACT_MOMENT || 10;