import { Request, Response } from 'express';
import * as createError from 'http-errors';
import * as _ from 'lodash';
import * as Models from '../../models';

import { ERROR_CODES, HTTP_ERRORS } from '../../constants';

const Users = Models.default.Users;

export default {
  create: async (req: Request, res: Response) => {
    const User = new Users(req.body);
    const result = await User.save();

    return res.json(result);
  },
  update: async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await Users.findByPk(id);

    if (!user) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.USER_NOT_FOUND].MESSAGE
      );
    }

    user.set(req.body);
    const result = await user.save();

    return res.json(result);
  },
  findById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await Users.findByPk(id);

    if (!user) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.USER_NOT_FOUND].MESSAGE
      );
    }

    return res.json(user);
  },
  destroy: async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await Users.findByPk(id);

    if (!user) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.USER_NOT_FOUND].MESSAGE
      );
    }

    const result = await user.destroy();

    return res.json(result);
  },
  find: async (req: Request, res: Response) => {
    const where =
      req.query.where && _.isString(req.query.where)
        ? JSON.parse(req.query.where)
        : {};
    const result = await Users.findAll({ where });

    return res.json(result);
  }
};
