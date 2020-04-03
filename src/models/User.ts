import * as bcrypt from 'bcrypt';
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
import { validateDuplicateFields } from './index';

const {
  USER_DUPLICATE_USERNAME,
  USER_DUPLICATE_EMAIL,
  USER_DUPLICATE_PHONE
} = ERROR_CODES;

const duplicateFields = {
  username: {
    field: 'username',
    error: HTTP_ERRORS[USER_DUPLICATE_USERNAME].MESSAGE
  },
  email: {
    field: 'email',
    error: HTTP_ERRORS[USER_DUPLICATE_EMAIL].MESSAGE
  },
  phone: {
    field: 'phone',
    error: HTTP_ERRORS[USER_DUPLICATE_PHONE].MESSAGE
  }
};

// interface IUserFieldValidateDup {
//   instance: any;
//   field: 'username' | 'email' | 'phone';
//   error: string;
// }

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

  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.DATE)
  /* tslint:disable-next-line:variable-name */
  created_at: Date;

  @Column(DataType.DATE)
  /* tslint:disable-next-line:variable-name */
  updated_at: Date;

  @BeforeCreate
  @BeforeUpdate
  static async beforeSaveInstance(instance: Users) {
    await validateDuplicateFields(instance, Users, duplicateFields);

    if (instance.changed('password')) {
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(instance.password, salt);

      instance.password = hash;
    }
  }

  @BeforeCreate
  static async beforeCreateInstance(instance: Users) {
    const now = new Date();

    instance.set('updated_at', now);
    instance.set('created_at', now);
  }

  @BeforeUpdate
  static async beforeUpdateInstance(instance: Users) {
    instance.set('updated_at', new Date());
  }

  static comparePassword = async (hash: string, password: string) => {
    const match = await bcrypt.compareSync(password, hash);

    if (!match) {
      throw new createError.BadRequest(
        HTTP_ERRORS[ERROR_CODES.INVALID_PASSWORD].MESSAGE
      );
    }

    return true;
  };
}
