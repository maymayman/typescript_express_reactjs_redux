import * as mysql_import from 'mysql-import';
import * as path from 'path';
import * as minimist from 'minimist';
import logger from '../plugins/logger';

const migrateArgs = minimist(process.argv.slice(2));
const host = process.env.MY_SQL_HOST ||  'localhost';
const user = process.env.MY_SQL_USER || 'root';
const password = process.env.MY_SQL_PASSWORD || 'my-secret-pw';
const database = process.env.MY_SQL_DATABASE_NAME || 'stock_develop';
const port = process.env.MY_SQL_PORT ? parseInt(process.env.MY_SQL_PORT, 10) : 3307;

const mydb_importer = mysql_import.config({
  host, user,
  password,
  database,
  port,
  onerror: err=> logger.error('mysql import cant working' + err)
});

const my_sql_migration_up = async (paths: string[]): Promise<boolean> => {
  for (const path of paths) {
    await mydb_importer.import(path).then(() => 
      logger.info(`Migration ${path} successful.`)
    ).catch(error => {
      logger.error(`Migration ${path} error: ${error}`)
    });
  }

  return true;
}

const M_01_USER: string = path.join(__dirname, 'up', 'm-1-User.sql');
const migratePaths: string[] = [ M_01_USER ];

const migratetions = new Map([
  ['up', () => my_sql_migration_up(migratePaths)],
  ['default', () => console.log('Not Found.')]
]);

const migratetion = migratetions.get(`${migrateArgs['n']}`) as any;
migratetion.call(this);
