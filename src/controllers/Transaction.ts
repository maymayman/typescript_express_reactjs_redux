import { Request, Response } from 'express';
import * as Models from '../models';

const Transactions = Models.default.Transactions;

export default {
  post: async (req: Request, res: Response) => {
    const transaction = new Transactions(req.body);
    const result = await transaction.save();

    return res.json(result);
  }
};
