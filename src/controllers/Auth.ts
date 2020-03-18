import { Request, Response } from 'express';
import * as createError from 'http-errors';

import * as jwt from 'jsonwebtoken';
import * as Models from '../models';
import { Users } from '../models/User';

import { ERROR_CODES, HTTP_ERRORS } from '../constants';

// const Users = Models.default.Users;
const Sessions = Models.default.Sessions;
const SECRET_KEY = process.env.SECRET_KEY || 'My_secret_key';
const EXPIRE_TOKEN_TIME = process.env.EXPIRE_TOKEN_TIME || '7 days';

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
    const userPayload = { id: user.id };
    const token = await jwt.sign(userPayload, SECRET_KEY, {
      expiresIn: EXPIRE_TOKEN_TIME
    });
    const session = new Sessions({ session: token, user_id: user.id });

    await session.save();

    return res.json({ token, user });
  },
  logout: async (req: Request, res: Response) => {
    const USER_ID = req.params.userId;

    const now = new Date();
    const sessionByUserID = await Sessions.findOne({
      where: { user_id: USER_ID }
    });

    if (!sessionByUserID) {
      throw new createError.BadRequest(
        HTTP_ERRORS[ERROR_CODES.SESSION_NOT_FOUND].MESSAGE
      );
    }
    await sessionByUserID.set({ expried_at: now });
    const result = await sessionByUserID.save();

    return res.json(result);
  }
};
