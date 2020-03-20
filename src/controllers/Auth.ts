import { Request, Response } from 'express';
import * as createError from 'http-errors';

import * as jwt from 'jsonwebtoken';
import * as Models from '../models';
import { Users } from '../models/User';

import { ERROR_CODES, HTTP_ERRORS } from '../constants';

// const Users = Models.default.Users;
const Session = Models.default.Session;

export default {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await Users.findOne({
      where: { username },
      attributes: ['username', 'password', 'id']
    });

    if (!user) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.USER_NOT_FOUND].MESSAGE
      );
    }
    await Users.comparePassword(user.password, password);

    user.password = undefined;
    const key = 'My_secret_key';
    const token = await jwt.sign(JSON.parse(JSON.stringify(user)), key, {
      expiresIn: '7 days'
    });
    const session = new Session({ token, user_id: user.id });

    await session.save();

    return res.json({ token, user });
  }
};
