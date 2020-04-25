import * as express from 'express';

import SessionController from '../../controllers/Session';
import { asyncMiddleware } from '../../plugins/utility';
import SessionValidator from '../../validator/util';

const router = express.Router();
const { create, findById, update, destroy } = SessionController;

router.get('/:id', asyncMiddleware(findById));
router.post('/', asyncMiddleware(SessionValidator), asyncMiddleware(create));
router.put('/:id', asyncMiddleware(SessionValidator), asyncMiddleware(update));
router.delete('/:id', asyncMiddleware(destroy));

export default router;
