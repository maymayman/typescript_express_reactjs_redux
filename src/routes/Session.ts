import * as express from 'express';

import SessionController from '../controllers/Session';
import { asyncController } from '../plugins/utility';
import SessionValidator from '../validator/util';

const router = express.Router();
const { post, get, destroy } = SessionController;

router.post('/', asyncController(SessionValidator), asyncController(post));
router.get('/:id', asyncController(get));
router.delete('/:id', asyncController(destroy));

export default router;
