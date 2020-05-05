import { Request, Response } from 'express';
import * as createError from 'http-errors';

import * as jwt from 'jsonwebtoken';
import { ERROR_CODES, HTTP_ERRORS } from '../../constants';
import * as Models from '../../models';
import { Users } from '../../models/User';

import { EXPIRE_TOKEN_TIME, SECRET_KEY } from '../../../config';

const Sessions = Models.default.Sessions;
const { USER_NOT_FOUND } = ERROR_CODES;

export default {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await Users.findOne({
      where: { username },
      attributes: ['username', 'password', 'id']
    });

    if (!user) {
      const error = HTTP_ERRORS[USER_NOT_FOUND].MESSAGE;

      throw new createError.NotFound(error);
    }

    await Users.comparePassword(user.password, password);

    user.password = undefined;
    const jsonUser = JSON.parse(JSON.stringify({ id: user.id }));
    const token = await jwt.sign(jsonUser, SECRET_KEY, {
      expiresIn: EXPIRE_TOKEN_TIME
    });
    const session = new Sessions({ session: token, user_id: user.id });

    await session.save();

    return res.json({ token, user });
  },
  logout: async (req: Request, res: Response) => {
    const USER_ID = req.params.userId;

    const now = new Date();
    const sessionByUserId = await Sessions.findOne({
      where: { user_id: USER_ID }
    });

    if (!sessionByUserId) {
      throw new createError.BadRequest(
        HTTP_ERRORS[ERROR_CODES.SESSION_NOT_FOUND].MESSAGE
      );
    }
    await sessionByUserId.set({ expried_at: now });
    const result = await sessionByUserId.save();

    return res.json(result);
  }
};
