const mysql_import = require('mysql-import');
const path = require('path');

const mydb_importer = mysql_import.config({
    host: 'localhost',
    user: 'thong',
    password: '1',
    database: 'sys',
    onerror: err=>console.log(err.message)
});

const fileSQL = path.join(__dirname,'m-1-User.sql');
const imp = async ()=>{
    await mydb_importer.import(fileSQL).then(e =>{
        console.log('it worked');
    });
}

imp();