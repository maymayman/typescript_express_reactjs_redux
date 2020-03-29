import * as express from 'express';

import SessionController from '../controllers/Session';
import { asyncController } from '../plugins/utility';
import SessionValidator from '../validator/util';

const router = express.Router();
const { post, get, put } = SessionController;

router.post('/', asyncController(SessionValidator), asyncController(post));
router.get('/:id', asyncController(get));
router.put('/:id', asyncController(SessionValidator), asyncController(put));

export default router;
