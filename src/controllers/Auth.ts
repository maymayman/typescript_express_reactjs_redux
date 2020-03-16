import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as createError from 'http-errors';

import * as jwt from 'jsonwebtoken';
import * as Models from '../models';

import { ERROR_CODES, HTTP_ERRORS } from '../constants';

const Users = Models.default.Users;
const Session = Models.default.Session;

export default {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username } });

    if (!user) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.USER_NOT_FOUND].MESSAGE
      );
    }
    const match = await bcrypt.compareSync(password, user.password);

    if (!match) {
      throw new createError.BadRequest(
        HTTP_ERRORS[ERROR_CODES.USER_DOES_NOT_MATCH_PASSWORD].MESSAGE
      );
    }

    user.password = undefined;
    const JsonUser = JSON.parse(JSON.stringify(user));
    const key = 'My_secret_key';
    const token = await jwt.sign(JsonUser, key, {
      expiresIn: 60 * 60 * 24 * 7
    });
    const session = new Session({ token, user_id: user.id });

    await session.save();

    return res.json({ token, user });
  }
};
