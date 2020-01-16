import { Request, Response } from 'express'

export default {
    a : (req :Request ,res:Response) => res.json({code :200}),
    heloo : (name :String) => {return name+" hello"}
}
export const sum = (a:number , b :number) => {return a+b}
// heloo work 