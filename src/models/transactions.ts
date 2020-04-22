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
  Table,
  Unique
} from 'sequelize-typescript';
import { Stocks } from './Stock';

@Table({ tableName: 'transactions' })
export class Transactions extends Model<Transactions> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  id: number;

  @Unique
  @ForeignKey(() => Stocks)
  @Column(DataType.BIGINT)
  /* tslint:disable-next-line:variable-name */
  stock_id: number;

  @BelongsTo(() => Stocks)
  stock: Stocks;

  @AllowNull(false)
  @Column(DataType.DECIMAL(19, 4))
  /* tslint:disable-next-line:variable-name */
  close_price: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(19, 4))
  /* tslint:disable-next-line:variable-name */
  open_price: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(19, 4))
  /* tslint:disable-next-line:variable-name */
  high_price: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(19, 4))
  /* tslint:disable-next-line:variable-name */
  low_price: number;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  volume: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.DATE)
  /* tslint:disable-next-line:variable-name */
  exchange_date: Date;

  @Column(DataType.DATE)
  /* tslint:disable-next-line:variable-name */
  created_at: Date;

  @Column(DataType.DATE)
  /* tslint:disable-next-line:variable-name */
  updated_at: Date;

  @BeforeCreate
  static async beforeCreateInstance(instance: Transactions) {
    const now = new Date();

    instance.set('updated_at', now);
    instance.set('created_at', now);
  }

  @BeforeUpdate
  static async beforceUpdateInstance(instance: Transactions) {
    const now = new Date();

    instance.set('updated_at', now);
  }
}
