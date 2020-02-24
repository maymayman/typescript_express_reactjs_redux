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

const { BadRequest } = createError;
const {
  USER_DUPLICATE_USERNAME,
  USER_DUPLICATE_EMAIL,
  USER_DUPLICATE_PHONE
} = ERROR_CODES;

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

    const [userWithUsername, userWithEmail, userWithPhone] = await Promise.all([
      Users.findOne({ where: { username: instance.username } }),
      Users.findOne({ where: { email: instance.email } }),
      Users.findOne({ where: { phone: instance.phone } })
    ]);

    if (userWithUsername) {
      throw new BadRequest(HTTP_ERRORS[USER_DUPLICATE_USERNAME].MESSAGE);
    }
    if (userWithEmail) {
      throw new BadRequest(HTTP_ERRORS[USER_DUPLICATE_EMAIL].MESSAGE);
    }
    if (userWithPhone) {
      throw new BadRequest(HTTP_ERRORS[USER_DUPLICATE_PHONE].MESSAGE);
    }
  }

  @BeforeUpdate
  static async beforeUpdateInstance(instance: Users) {
    instance.set('updated_at', new Date());
    /** validate username */
    if (
      instance.changed('username') &&
      instance.previous('username') !== instance.username
    ) {
      const user = await Users.findOne({
        where: { username: instance.username }
      });

      if (user) {
        throw new BadRequest(HTTP_ERRORS[USER_DUPLICATE_USERNAME].MESSAGE);
      }
    }

    /** validate email */
    if (
      instance.changed('email') &&
      instance.previous('email') !== instance.email
    ) {
      const user = await Users.findOne({ where: { email: instance.email } });

      if (user) throw new BadRequest(HTTP_ERRORS[USER_DUPLICATE_EMAIL].MESSAGE);
    }

    /** validate phone */
    if (
      instance.changed('phone') &&
      instance.previous('phone') !== instance.phone
    ) {
      const user = await Users.findOne({ where: { phone: instance.phone } });

      if (user) throw new BadRequest(HTTP_ERRORS[USER_DUPLICATE_PHONE].MESSAGE);
    }
  }
}
