import { Request, Response } from 'express'

export default {
    a : (req :Request ,res:Response) => res.json({code :200})
}