import { Request, Response } from 'express'

export default {
    a : (req :Request ,res:Response) => res.json({code :200}),
    login : (req :Request ,res:Response) => {
        
    }
}
export const sum = (a:number , b :number) => {return a+b}
// heloo work 