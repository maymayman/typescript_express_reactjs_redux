import { Request, Response } from 'express';
import * as createError from 'http-errors';
import { ERROR_CODES, HTTP_ERRORS } from '../../constants';
import * as Models from '../../models';
import { dataQuery } from './utill';

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
    const { where, offset, limit, sortBy, sort } = dataQuery(req.query);
    const result = await Sessions.findAll({
      where,
      offset,
      limit,
      order: [[sortBy, sort]]
    });

    return res.json(result);
  }
};
