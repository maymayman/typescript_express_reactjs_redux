import * as express from 'express';

import controller from '../../controllers/api/User';
import { asyncMiddleware } from '../../plugins/utility';
import Validator from '../../validator/util';

const router = express.Router();
const { create, update, destroy, findById } = controller;

router.post('/', asyncMiddleware(Validator), asyncMiddleware(create));
router.put('/:id', asyncMiddleware(Validator), asyncMiddleware(update));
router.get('/:id', asyncMiddleware(findById));
router.delete('/:id', asyncMiddleware(destroy));
export default router;
