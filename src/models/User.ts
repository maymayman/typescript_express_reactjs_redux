import * as bcrypt from 'bcrypt';
import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class Users extends Model<Users> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  username: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  password: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  phone: string;

  @Column(DataType.DATE)
  /* tslint:disable-next-line:variable-name */
  created_at: Date;

  @Column(DataType.DATE)
  /* tslint:disable-next-line:variable-name */
  updated_at: Date;

  @Column(DataType.DATE)
  /* tslint:disable-next-line:variable-name */
  deleted_at: Date;

  @BeforeCreate
  @BeforeUpdate
  static async beforeSaveInstance(instance: Users) {
    try {
      if (instance.changed('password')) {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(instance.password, salt);

        instance.password = hash;
      }
    } catch (error) {
      throw error;
    }
  }
}
