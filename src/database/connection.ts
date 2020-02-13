import {Sequelize} from 'sequelize-typescript';
import {Users} from '../models/User';

 const sequelize =  new Sequelize({
        database: 'sys',
        dialect: 'mysql',
        username: 'thong',
        password: '1',
        storage: ':memory:',
        define: {
                timestamps: false
            }
});

sequelize.addModels([Users]);

export default sequelize
