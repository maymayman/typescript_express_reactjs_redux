import * as express from 'express';

import SessionController from '../controllers/Session';
import { asyncController } from '../plugins/utility';
import SessionValidator from '../validator/util';

const router = express.Router();
const { post } = SessionController;

router.post('/', asyncController(SessionValidator), asyncController(post));

export default router;
