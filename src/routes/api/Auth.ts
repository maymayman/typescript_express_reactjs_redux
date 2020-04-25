import * as express from 'express';

import Auth from '../../controllers/Auth';
import { asyncMiddleware } from '../../plugins/utility';
import AuthUser from '../../validator/Auth';

const router = express.Router();
const { login, logout } = Auth;

router.post('/login', asyncMiddleware(AuthUser), asyncMiddleware(login));
router.put('/logout/:userId', asyncMiddleware(logout));

export default router;
