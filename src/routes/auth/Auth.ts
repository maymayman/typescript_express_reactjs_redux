import * as express from 'express';

import Auth from '../../controllers/auth/Auth';
import { asyncMiddleware } from '../../plugins/utility';
import { validateLoginInput } from '../../validator/Auth';

const router = express.Router();
const { login, logout } = Auth;

router.post(
  '/login',
  asyncMiddleware(validateLoginInput),
  asyncMiddleware(login)
);
router.put('/logout/:userId', asyncMiddleware(logout));

export default router;
