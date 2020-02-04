import { Column,  Model, Table, PrimaryKey, AutoIncrement, AllowNull, Unique, DataType } from 'sequelize-typescript';

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
    
}