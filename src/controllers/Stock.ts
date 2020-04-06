import { Request, Response } from 'express';
import * as Models from '../models';

const Stocks = Models.default.Stocks;

export default {
  post: async (req: Request, res: Response) => {
    const stock = new Stocks(req.body);
    const result = await stock.save();

    return res.json(result);
  }
};
