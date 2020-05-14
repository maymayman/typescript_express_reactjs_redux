import { Request, Response } from 'express';
import * as createError from 'http-errors';
import { ERROR_CODES, HTTP_ERRORS } from '../../constants';
import * as Models from '../../models';

const Transactions = Models.default.Transactions;

export default {
  create: async (req: Request, res: Response) => {
    const transaction = new Transactions(req.body);
    const result = await transaction.save();

    return res.json(result);
  },
  update: async (req: Request, res: Response) => {
    const id = req.params.id;
    const transtraction = await Transactions.findByPk(id);

    if (!transtraction) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.TRANSACTION_NOT_FOUND].MESSAGE
      );
    }

    transtraction.set(req.body);
    const result = await transtraction.save();

    return res.json(result);
  },
  findByid: async (req: Request, res: Response) => {
    const id = req.params.id;
    const transtraction = await Transactions.findByPk(id);

    if (!transtraction) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.TRANSACTION_NOT_FOUND].MESSAGE
      );
    }

    return res.json(transtraction);
  },
  destroy: async (req: Request, res: Response) => {
    const id = req.params.id;
    const transtraction = await Transactions.findByPk(id);

    if (!transtraction) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.TRANSACTION_NOT_FOUND].MESSAGE
      );
    }

    const result = await transtraction.destroy();

    return res.json(result);
  },
  find: async (req: Request, res: Response) => {
    const where = req.query.where ? JSON.parse(req.query.where) : {};
    const limit = req.query.limit ? Number(req.query.limit) : 1;
    const offset = req.query.offset ? Number(req.query.offset) : 0;
    const sortBy = req.query.sortBy || 'exchange_date';
    const sort = req.query.sort || 'DESC';
    const result = await Transactions.findAll({
      where,
      offset,
      limit,
      order: [[sortBy, sort]]
    });

    return res.json(result);
  }
};
