import { Request, Response } from 'express'
import { Users} from '../models/User';

export default {
    
    login :async (req :Request ,res:Response) => {
        try{
            const username :string =req.body.username;
            const password :string =req.body.password ;
            let errMessage :string ='';
            if(!username || !password){
                errMessage ="Missing or Invalid username or password";
                return res.json({
                    code :400,
                    data : null ,
                    err :errMessage
                })
            }
            const User = await Users.findOne({where:{username}});
            if(!User){
                errMessage ='wrong username or not resigter';
                return res.json({
                    code :400,
                    data :null,
                    err :errMessage
                })
            }
            if(User.password != password){
                errMessage = ' Invalid password';
                return res.send(errMessage);
            }
            return res.send("WellCome User "+User.username);
    }
        catch(err){
            console.log(err);
            return
        }; 
    }
}
export const sum = (a:number , b :number) => {return a+b}
// heloo work 