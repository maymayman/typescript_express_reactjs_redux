import { Request, Response } from 'express';
import * as createError from 'http-errors';
import { ERROR_CODES, HTTP_ERRORS } from '../constants';
import * as Models from '../models';

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
  getList: async (req: Request, res: Response) => {
    const code = req.query.code;
    const arrStock = await Stocks.findAll({ where: { stock_code: code } });

    return res.json(arrStock);
  }
};
