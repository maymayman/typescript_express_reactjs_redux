import * as express from 'express';

import Auth from '../../controllers/Auth';
import { asyncMiddleware } from '../../plugins/utility';

const router = express.Router();
const { login, logout } = Auth;

router.post('/login', asyncMiddleware(login));
router.put('/logout/:userId', asyncMiddleware(logout));

export default router;
