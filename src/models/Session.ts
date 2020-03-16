import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { Users } from './User';

@Table({ tableName: 'session_users' })
export class Session extends Model<Session> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  token: string;

  @ForeignKey(() => Users)
  @Column
  /* tslint:disable-next-line:variable-name */
  user_id: number;

  @BelongsTo(() => Users)
  user: Users;

  @Column(DataType.STRING)
  device: string;

  @Column(DataType.BIGINT)
  /* tslint:disable-next-line:variable-name */
  device_id: number;

  @Column(DataType.DATE)
  /* tslint:disable-next-line:variable-name */
  expried_at: Date;

  @Column(DataType.DATE)
  /* tslint:disable-next-line:variable-name */
  created_at: Date;

  @Column(DataType.DATE)
  /* tslint:disable-next-line:variable-name */
  updated_at: Date;

  @BeforeCreate
  @BeforeUpdate
  static async beforeCreateInstance(instance: Session) {
    const now = new Date();

    instance.set('updated_at', now);
    instance.set('created_at', now);
  }

  @BeforeCreate
  static async createExpriedAt(instance: Session) {
    const now = new Date();
    const week = now.setDate(now.getDate() + 7);

    instance.set('expried_at', new Date(week));
  }

  @BeforeUpdate
  static async beforeUpdateInstance(instance: Users) {
    instance.set('updated_at', new Date());
  }
}
