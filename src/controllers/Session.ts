import { Request, Response } from 'express';
// import * as createError from 'http-errors';
import * as Models from '../models';

// import { ERROR_CODES, HTTP_ERRORS } from '../constants';

const Sessions = Models.default.Sessions;

export default {
  post: async (req: Request, res: Response) => {
    const session = new Sessions(req.body);
    const result = await session.save();

    return res.json(result);
  }
};
