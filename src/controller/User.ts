import { Request, Response } from 'express'
import { Users} from '../models/User';
import * as bcrypt from 'bcrypt';

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
            const checkPassword :boolean = await bcrypt.compareSync(password,User.password);
            if(!checkPassword){
                errMessage = ' Invalid password';
                return res.send(errMessage);
            }
            return res.json(User);
    }             
        catch(err){
            console.log(err);
            return
        }; 
    }
}