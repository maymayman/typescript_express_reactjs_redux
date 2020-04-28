import * as express from 'express';

import controller from '../../controllers/api/Stock';
import { asyncMiddleware } from '../../plugins/utility';
import Validator from '../../validator/util';

const router = express.Router();
const { create, findById, update, destroy, find } = controller;

router.post('/', asyncMiddleware(Validator), asyncMiddleware(create));
router.get('/:id', asyncMiddleware(findById));
router.put('/:id', asyncMiddleware(Validator), asyncMiddleware(update));
router.delete('/:id', asyncMiddleware(destroy));
router.get('/', asyncMiddleware(find));
export default router;
