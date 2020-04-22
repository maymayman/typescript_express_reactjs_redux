import { Request, Response } from 'express';
import * as createError from 'http-errors';
import { ERROR_CODES, HTTP_ERRORS } from '../constants';
import * as Models from '../models';

const Transactions = Models.default.Transactions;

export default {
  put: async (req: Request, res: Response) => {
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
  }
};
