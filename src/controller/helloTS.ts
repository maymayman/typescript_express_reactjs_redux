import { Request, Response } from 'express';

export default {
  a: (req: Request, res: Response) => res.json({ code: 200 }),
  hello: (name: string) => `${name} hello`
};
export const sum = (a: number, b: number) => a + b;
