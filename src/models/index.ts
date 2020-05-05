import { Sequelize } from 'sequelize-typescript';
import { Sessions } from './Session';
import { Stocks } from './Stock';
import { Transactions } from './transactions';
import { Users } from './User';

import {
  MY_SQL_DATABASE_NAME,
  MY_SQL_HOST,
  MY_SQL_PASSWORD,
  MY_SQL_PORT,
  MY_SQL_USER,
  SQL_DIALECT
} from '../../config';
import logger from '../plugins/logger';

const host = MY_SQL_HOST;
const username = MY_SQL_USER;
const password = MY_SQL_PASSWORD;
const database = MY_SQL_DATABASE_NAME;
const dialect = SQL_DIALECT;
const port = MY_SQL_PORT;

const sequelize = new Sequelize({
  host,
  database,
  dialect,
  username,
  password,
  port,
  define: {
    timestamps: false
  }
});

sequelize.addModels([Users, Sessions, Stocks, Transactions]);

sequelize
  .authenticate()
  .then(() => {
    logger.info('Database Connectioned!!!');
  })
  .catch(err => {
    logger.error(`Connect Database Failed: ${err}`);
  });

export default sequelize.models;
