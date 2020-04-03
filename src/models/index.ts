import * as createError from 'http-errors';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Sessions } from './Session';
import { Stocks } from './Stock';
import { Users } from './User';

import logger from '../plugins/logger';
const { BadRequest } = createError;

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

sequelize.addModels([Users, Sessions, Stocks]);

sequelize
  .authenticate()
  .then(() => {
    logger.info('Database Connectioned!!!');
  })
  .catch(err => {
    logger.error(`Connect Database Failed: ${err}`);
  });

const validateDuplicate = async (options, _this): Promise<void> => {
  const { instance, field, error } = options;

  if (instance.changed(field) && instance.previous(field) !== instance[field]) {
    const query = { where: { [field]: instance[field] } };
    const user = await _this.findOne(query);

    if (user) throw new BadRequest(error);
  }

  return;
};

export const validateDuplicateFields = async (
  instance: any,
  _this,
  duplicateFields
): Promise<void> => {
  try {
    const keys = Object.keys(duplicateFields);

    for (const key of keys) {
      const { field, error } = duplicateFields[key];
      await validateDuplicate({ instance, field, error }, _this);
    }

    return;
  } catch (error) {
    throw error;
  }
};

export default sequelize.models;
