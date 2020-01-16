import * as express from 'express'
import heathcheckCtroller from '../controller/helloTS';
const router = express.Router()

router.get('/',heathcheckCtroller.a); 

export default router