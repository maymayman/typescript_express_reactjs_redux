import { Request, Response } from 'express';
import * as Models from '../../models';

const Stocks = Models.default.Stocks;

export default {
  findAll: async (req: Request, res: Response) => {
    const result = await Stocks.findAll();

    return res.json(result);
  }
};
