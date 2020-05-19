import { Request, Response } from 'express';
import * as createError from 'http-errors';
import { ERROR_CODES, HTTP_ERRORS } from '../../constants';
import * as Models from '../../models';
import { dataQuery } from './utill';

const Stocks = Models.default.Stocks;

export default {
  create: async (req: Request, res: Response) => {
    const stock = new Stocks(req.body);
    const result = await stock.save();

    return res.json(result);
  },
  findById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const stock = await Stocks.findByPk(id);

    if (!stock) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.STOCK_NOT_FOUND].MESSAGE
      );
    }

    return res.json(stock);
  },
  update: async (req: Request, res: Response) => {
    const stock = await Stocks.findByPk(req.params.id);

    if (!stock) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.STOCK_NOT_FOUND].MESSAGE
      );
    }

    stock.set(req.body);
    const result = await stock.save();

    return res.json(result);
  },
  destroy: async (req: Request, res: Response) => {
    const stock = await Stocks.findByPk(req.params.id);

    if (!stock) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.STOCK_NOT_FOUND].MESSAGE
      );
    }
    const result = await stock.destroy();

    return res.json(result);
  },
  find: async (req: Request, res: Response) => {
    const { where, offset, limit, sortBy, sort } = dataQuery(req.query);
    const result = await Stocks.findAll({
      where,
      offset,
      limit,
      order: [[sortBy, sort]]
    });

    return res.json(result);
  }
};
