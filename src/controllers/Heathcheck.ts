import { Request, Response } from 'express';

export default {
  run: (req: Request, res: Response) =>
    res.json({ message: 'App running successful.' }),
  hello: (name: string) => `${name} hello`
};
export const sum = (a: number, b: number) => a + b;
