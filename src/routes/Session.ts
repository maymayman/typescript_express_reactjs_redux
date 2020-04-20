import * as express from 'express';

import SessionController from '../controllers/Session';
import { asyncController } from '../plugins/utility';
import SessionValidator from '../validator/util';

const router = express.Router();
const { post, get, put, destroy } = SessionController;

router.get('/:id', asyncController(get));
router.post('/', asyncController(SessionValidator), asyncController(post));
router.put('/:id', asyncController(SessionValidator), asyncController(put));
router.delete('/:id', asyncController(destroy));

export default router;
