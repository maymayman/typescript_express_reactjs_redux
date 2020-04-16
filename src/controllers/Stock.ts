import { Request, Response } from 'express';
import * as createError from 'http-errors';
import { ERROR_CODES, HTTP_ERRORS } from '../constants';
import * as Models from '../models';

const Stocks = Models.default.Stocks;

export default {
  post: async (req: Request, res: Response) => {
    const stock = new Stocks(req.body);
    const result = await stock.save();

    return res.json(result);
  },
  get: async (req: Request, res: Response) => {
    const id = req.params.id;
    const stock = await Stocks.findByPk(id);

    if (!stock) {
      throw new createError.NotFound(
        HTTP_ERRORS[ERROR_CODES.STOCK_NOT_FOUND].MESSAGE
      );
    }

    return res.json(stock);
  }
};
