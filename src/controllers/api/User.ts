import { Request, Response } from 'express';
import * as createError from 'http-errors';
import * as Models from '../../models';

import { DEFAULT_QUERY, ERROR_CODES, HTTP_ERRORS } from '../../constants';

const Users = Models.default.Users;
const {
  QUERY_WHRERE,
  QUERY_LIMIT,
  QUERY_OFFSET,
  QUERY_SORT,
  QUERY_SORT_BY,
  HEXADECIMAL
} = DEFAULT_QUERY;

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
    const where = req.query.where ? JSON.parse(req.query.where) : QUERY_WHRERE;
    const limit = req.query.limit
      ? parseInt(req.query.limit, HEXADECIMAL)
      : QUERY_LIMIT;
    const offset = req.query.offset
      ? parseInt(req.query.offset, HEXADECIMAL)
      : QUERY_OFFSET;
    const sortBy = req.query.sortBy || QUERY_SORT_BY;
    const sort = req.query.sort || QUERY_SORT;
    const result = await Users.findAll({
      where,
      offset,
      limit,
      order: [[sortBy, sort]]
    });

    return res.json(result);
  }
};
