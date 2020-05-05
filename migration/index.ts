import * as minimist from 'minimist';
import * as mysqlImport from 'mysql-import';
import * as path from 'path';

import logger from '../src/plugins/logger';

import { 
  MY_SQL_DATABASE_NAME, 
  MY_SQL_HOST, 
  MY_SQL_PASSWORD, 
  MY_SQL_PORT, 
  MY_SQL_USER 
} from '../config';

const migrateArgs = minimist(process.argv.slice(2));
const host = MY_SQL_HOST;
const user = MY_SQL_USER;
const password = MY_SQL_PASSWORD;
const database = MY_SQL_DATABASE_NAME;
const port = MY_SQL_PORT;

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
const M_04_TRANSACTION = path.join(__dirname,'up','m-4-Transaction.sql');
const migratePaths = [M_01_USER,M_03_SESSIOM,M_02_STOCK,M_04_TRANSACTION];

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
