import * as express from 'express';

import Auth from '../controllers/Auth';
import { asyncController } from '../plugins/utility';
import AuthValidator from '../validator/Auth';

const router = express.Router();
const { login } = Auth;

router.post('/login', asyncController(AuthValidator), asyncController(login));

export default router;
