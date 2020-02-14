import * as express from 'express'
import heathcheckCtroller from '../controller/User';
const router = express.Router()

router.post('/',heathcheckCtroller.login); 

export default router