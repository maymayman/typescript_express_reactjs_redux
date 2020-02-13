import { Column,  Model, Table, PrimaryKey, AutoIncrement, AllowNull, Unique, DataType, BeforeCreate } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table({
    tableName:'Users'
})
export class Users extends Model<Users>{

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    id: number;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    username :string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    password :string;
    
    @AllowNull(false)
    @Column(DataType.INTEGER)
    phone : number ;

    @Column(DataType.DATE)
    updated_at:Date;

    @Column(DataType.DATE)
    deleted_at:Date;

    @BeforeCreate
    static async Bcryptpassword(instance: Users){
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(instance.password, salt);
        instance.password = hash;
    }
}