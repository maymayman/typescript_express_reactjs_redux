import * as express from 'express'
import userController from '../controller/User';
const router = express.Router()

router.post('/register',userController.register); 

export default router