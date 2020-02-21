import { Request, Response } from 'express';
import * as Models from '../models';

const Users = Models.default.Users;

export default {
  post: async (req: Request, res: Response) => {
    const user = new Users(req.body.data);
    const result = await user.save();

    return res.json(result);
  }
};
