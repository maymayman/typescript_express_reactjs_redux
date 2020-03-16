import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Session } from './Session';
import { Users } from './User';

import logger from '../plugins/logger';

const host = process.env.MY_SQL_HOST || 'localhost';
const username = process.env.MY_SQL_USER || 'root';
const password = process.env.MY_SQL_PASSWORD || 'my-secret-pw';
const database = process.env.MY_SQL_DATABASE_NAME || 'stock_develop';
const dialect = (process.env.SQL_DIALECT as Dialect) || 'mysql';
const port = process.env.MY_SQL_PORT
  ? parseInt(process.env.MY_SQL_PORT, 10)
  : 3306;

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

sequelize.addModels([Users, Session]);

sequelize
  .authenticate()
  .then(() => {
    logger.info('Database Connectioned!!!');
  })
  .catch(err => {
    logger.error(`Connect Database Failed: ${err}`);
  });

export default sequelize.models;
