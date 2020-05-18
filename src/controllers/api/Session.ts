import { Request, Response } from 'express';
import * as createError from 'http-errors';
import * as _ from 'lodash';
import * as Models from '../../models';

import { DEFAULT_QUERY, ERROR_CODES, HTTP_ERRORS } from '../../constants';

const Sessions = Models.default.Sessions;

export default {
  create: async (req: Request, res: Response) => {
    const session = new Sessions(req.body);
    const result = await session.save();

    return res.json(result);
  },

  findById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const session = await Sessions.findByPk(id);

    if (!session) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.SESSION_NOT_FOUND].MESSAGE
      );
    }

    return res.json(session);
  },

  update: async (req: Request, res: Response) => {
    const id = req.params.id;
    const session = await Sessions.findByPk(id);

    if (!session) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.SESSION_NOT_FOUND].MESSAGE
      );
    }

    session.set(req.body);
    const result = await session.save();

    return res.json(result);
  },
  destroy: async (req: Request, res: Response) => {
    const id = req.params.id;
    const session = await Sessions.findByPk(id);

    if (!session) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.SESSION_NOT_FOUND].MESSAGE
      );
    }

    const result = await session.destroy();

    return res.json(result);
  },
  find: async (req: Request, res: Response) => {
    const where =
      req.query.where && _.isString(req.query.where)
        ? JSON.parse(req.query.where)
        : DEFAULT_QUERY.QUERY_WHRERE;
    const limit = req.query.limit
      ? Number(req.query.limit)
      : DEFAULT_QUERY.QUERY_LIMIT;
    const offset = req.query.offset
      ? Number(req.query.offset)
      : DEFAULT_QUERY.QUERY_OFFSET;
    const sortBy = req.query.sortBy || DEFAULT_QUERY.QUERY_SORT_BY;
    const sort = req.query.sort || DEFAULT_QUERY.QUERY_SORT;
    const result = await Sessions.findAll({
      where,
      offset,
      limit,
      order: [[sortBy, sort]]
    });

    return res.json(result);
  }
};
