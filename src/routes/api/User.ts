import * as express from 'express';

import controller from '../../controllers/api/User';
import { asyncMiddleware } from '../../plugins/utility';
import Validator from '../../validator/api/index';

const router = express.Router();
const { create, update, destroy, findById, find } = controller;

router.post('/', asyncMiddleware(Validator), asyncMiddleware(create));
router.put('/:id', asyncMiddleware(Validator), asyncMiddleware(update));
router.get('/:id', asyncMiddleware(findById));
router.delete('/:id', asyncMiddleware(destroy));
router.get('/', asyncMiddleware(find));
export default router;
