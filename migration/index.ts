import * as minimist from 'minimist';
import * as mysqlImport from 'mysql-import';
import * as path from 'path';

import logger from '../src/plugins/logger';

const migrateArgs = minimist(process.argv.slice(2));
const host = process.env.MY_SQL_HOST || 'localhost';
const user = process.env.MY_SQL_USER || 'root';
const password = process.env.MY_SQL_PASSWORD || 'my-secret-pw';
const database = process.env.MY_SQL_DATABASE_NAME || 'stock_develop';
const port = process.env.MY_SQL_PORT
  ? parseInt(process.env.MY_SQL_PORT, 10)
  : 3306;

const importer = mysqlImport.config({
  host,
  user,
  password,
  database,
  port,
  onerror: err => logger.error(`mysql import cant working ${err}`)
});

const up = async (paths: string[]): Promise<boolean> => {
  for (const element of paths) {
    await importer
      .import(element)
      .then(() => logger.info(`[Migration] ${element} successful.`))
      .catch(error => {
        logger.error(`[Migration] ${element} error: ${error}`);
      });
  }

  return true;
};

const M_01_USER = path.join(__dirname, 'up', 'm-1-User.sql');
const M_02_STOCK = path.join(__dirname,'up','m-2-Stock.sql');
const M_03_SESSIOM = path.join(__dirname,'up','m-3-Session.sql');
const M_04_STOCK_DAILY_PRICE = path.join(__dirname,'up','m-4-Stock-daily-prices.sql');
const migratePaths = [M_01_USER,M_03_SESSIOM,M_02_STOCK,M_04_STOCK_DAILY_PRICE];

const migratetions = new Map([
  ['up', () => up(migratePaths)],
  [
    'default',
    () => {
      logger.error('Not Found.');
    }
  ]
]);

const migratetion = migratetions.get(`${migrateArgs.n}`) as any;

migratetion.call();
