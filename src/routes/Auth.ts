import * as express from 'express';

import Auth from '../controllers/Auth';
import { asyncController } from '../plugins/utility';
import AuthUser from '../validator/Auth';

const router = express.Router();
const { login } = Auth;

router.post('/login', asyncController(AuthUser), asyncController(login));

export default router;
