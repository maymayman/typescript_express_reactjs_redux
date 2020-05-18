import * as express from 'express';

import controller from '../../controllers/api/Transaction';
import { asyncMiddleware } from '../../plugins/utility';
import Validator from '../../validator/api/index';

const router = express.Router();
const { create, update, findByid, destroy, find } = controller;

router.post('/', asyncMiddleware(Validator), asyncMiddleware(create));
router.put('/:id', asyncMiddleware(Validator), asyncMiddleware(update));
router.get('/:id', asyncMiddleware(findByid));
router.delete('/:id', asyncMiddleware(destroy));
router.get('/', asyncMiddleware(find));

export default router;
