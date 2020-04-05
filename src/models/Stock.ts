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
import { ERROR_CODES, HTTP_ERRORS } from '../constants';
import { validateDuplicateFields } from './index';

const { STOCK_DUPLICATE_CODE } = ERROR_CODES;

const duplicateFields = {
  stock_code: {
    field: 'stock_code',
    error: HTTP_ERRORS[STOCK_DUPLICATE_CODE].MESSAGE
  }
};

@Table({ tableName: 'stock' })
export class Stocks extends Model<Stocks> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  /* tslint:disable-next-line:variable-name */
  stock_code: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  /* tslint:disable-next-line:variable-name */
  stock_name: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  /* tslint:disable-next-line:variable-name */
  stock_price: number;

  @Column(DataType.DATE)
  /* tslint:disable-next-line:variable-name */
  created_at: Date;

  @Column(DataType.DATE)
  /* tslint:disable-next-line:variable-name */
  updated_at: Date;

  @BeforeCreate
  static async beforeCreateInstance(instance: Stocks) {
    const now = new Date();

    instance.set('updated_at', now);
    instance.set('created_at', now);
  }

  @BeforeCreate
  @BeforeUpdate
  static async beforeSaveInstance(instance: Stocks) {
    await validateDuplicateFields(instance, Stocks, duplicateFields);
  }

  @BeforeUpdate
  static async beforceUpdateInstance(instance: Stocks) {
    const now = new Date();

    instance.set('updated_at', now);
  }
}
