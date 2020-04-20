import * as createError from 'http-errors';
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
const { BadRequest } = createError;

const { STOCK_DUPLICATE_CODE } = ERROR_CODES;

const duplicateFields = {
  stock_code: {
    field: 'stock_code',
    error: HTTP_ERRORS[STOCK_DUPLICATE_CODE].MESSAGE
  }
};

export interface IStockFieldValidateDup {
  instance: Stocks;
  field: 'stock_code';
  error: string;
}
const validateDuplicate = async (
  options: IStockFieldValidateDup
): Promise<void> => {
  const { instance, field, error } = options;
  if (instance.changed(field) && instance.previous(field) !== instance[field]) {
    const query = { where: { [field]: instance[field] } };
    const stock = await Stocks.findOne(query);

    if (stock) throw new BadRequest(error);
  }

  return;
};

const validateDuplicateFields = async (instance: Stocks): Promise<void> => {
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
  @Column(DataType.DECIMAL(19, 4))
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
    await validateDuplicateFields(instance);
  }

  @BeforeUpdate
  static async beforceUpdateInstance(instance: Stocks) {
    const now = new Date();

    instance.set('updated_at', now);
  }
}
