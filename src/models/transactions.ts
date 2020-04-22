import * as createError from 'http-errors';
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
import { ERROR_CODES, HTTP_ERRORS } from '../constants';
import { Stocks } from './Stock';

const { BadRequest } = createError;

const {
  TRANSACTION_DUPLICATE_EXCHANGE_DATE,
  TRANSACTION_DUPLICATE_STOCK_ID
} = ERROR_CODES;

interface IDailyStockPricesFieldValidateDup {
  instance: Transactions;
  field: 'stock_id' | 'exchange_date';
  error: string;
}
const duplicateFields = {
  stock_id: {
    field: 'stock_id',
    error: HTTP_ERRORS[TRANSACTION_DUPLICATE_STOCK_ID].MESSAGE
  },
  exchange_date: {
    field: 'exchange_date',
    error: HTTP_ERRORS[TRANSACTION_DUPLICATE_EXCHANGE_DATE].MESSAGE
  }
};

const validateDuplicate = async (
  options: IDailyStockPricesFieldValidateDup
): Promise<void> => {
  const { instance, field, error } = options;
  if (instance.changed(field) && instance.previous(field) !== instance[field]) {
    const query: object = { where: { [field]: instance[field] } };
    const transaction = await Transactions.findOne(query);

    if (transaction) throw new BadRequest(error);
  }

  return;
};
const validateDuplicateFields = async (
  instance: Transactions
): Promise<void> => {
  try {
    const keys = Object.keys(duplicateFields);

    for (const key of keys) {
      const { field, error } = duplicateFields[key];
      await validateDuplicate({ instance, field, error });
    }

    return;
  } catch (error) {
    throw error;
  }
};

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

  @BeforeCreate
  @BeforeUpdate
  static async beforeSaveInstance(instance: Transactions) {
    await validateDuplicateFields(instance);
  }
}
