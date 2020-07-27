import * as express from 'express';

import controller from '../../controllers/api/Stock';
import { asyncMiddleware } from '../../plugins/utility';

const router = express.Router();
const { create, findById, update, destroy, find } = controller;

router.post('/', asyncMiddleware(create));
router.get('/:id', asyncMiddleware(findById));
router.put('/:id', asyncMiddleware(update));
router.delete('/:id', asyncMiddleware(destroy));
router.get('/', asyncMiddleware(find));
export default router;
