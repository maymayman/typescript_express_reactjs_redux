import * as mysql_import from 'mysql-import';
import * as path from 'path';
import logger from '../plugins/logger';
const mydb_importer = mysql_import.config({
    host: 'localhost',
    user: 'thong',
    password: '1',
    database: 'sys',
    onerror: err=> logger.error("it can't working"+err)
});

const fileSQL: string = path.join(__dirname,'m-1-User.sql');
const imp = async ()=>{
    await mydb_importer.import(fileSQL).then(e =>{
        logger.info('it worked');
    });
}

imp();

export default mydb_importer;