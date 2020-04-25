import * as express from 'express';

import SessionController from '../../controllers/Session';
import { asyncController } from '../../plugins/utility';
import SessionValidator from '../../validator/util';

const router = express.Router();
const { create, findById, update, destroy } = SessionController;

router.get('/:id', asyncController(findById));
router.post('/', asyncController(SessionValidator), asyncController(create));
router.put('/:id', asyncController(SessionValidator), asyncController(update));
router.delete('/:id', asyncController(destroy));

export default router;
