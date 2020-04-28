import * as express from 'express';

import SessionController from '../../controllers/api/Session';
import { asyncMiddleware } from '../../plugins/utility';
import SessionValidator from '../../validator/util';

const router = express.Router();
const { create, findById, update, destroy, find } = SessionController;

router.get('/:id', asyncMiddleware(findById));
router.post('/', asyncMiddleware(SessionValidator), asyncMiddleware(create));
router.put('/:id', asyncMiddleware(SessionValidator), asyncMiddleware(update));
router.delete('/:id', asyncMiddleware(destroy));
router.get('/', asyncMiddleware(find));

export default router;
