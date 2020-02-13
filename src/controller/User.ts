import { Request, Response } from 'express'
import { Users} from '../models/User';

export default {
    
    register :async (req:Request,res:Response) =>{
        try{
            const { username , password , phone } = req.body;
            let errorMessage: string ='';
            if(!username || !password || !phone){
                errorMessage = 'Missing or Invalid username , password or phone';
                return res.json({
                    code :400,
                    mess : errorMessage
                })
            };
            const data:any ={
                username,password,phone: parseInt(phone)
            }
            const result = new Users(data);
            await result.save();
            return res.json({code:200 ,data:result,mess:"wellcome user"});
        }catch(err){
            return res.json({ code: 400,mess: "faild register" ,data:err});
        }
    }
}