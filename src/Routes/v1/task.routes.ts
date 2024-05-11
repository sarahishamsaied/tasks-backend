import { Router } from 'express';
import { create, findById, update, remove, get, updateStatus } from '../../Controllers/Task.controller';
import { asyncWrapper } from '../../utils/asyncWrapper';

const router = Router();

router.post('/', asyncWrapper(create));
router.get('/user', asyncWrapper(get));
router.get('/:id', asyncWrapper(findById));
router.put('/:id', asyncWrapper(update));
router.patch('/:id', asyncWrapper(remove));
router.patch('/:id/status', asyncWrapper(updateStatus));

export default router;
