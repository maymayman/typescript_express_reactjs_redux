import * as express from 'express';

import SessionController from '../../controllers/api/Session';
import { asyncMiddleware } from '../../plugins/utility';

const router = express.Router();
const { create, findById, update, destroy, find } = SessionController;

router.get('/:id', asyncMiddleware(findById));
router.post('/', asyncMiddleware(create));
router.put('/:id', asyncMiddleware(update));
router.delete('/:id', asyncMiddleware(destroy));
router.get('/', asyncMiddleware(find));

export default router;
