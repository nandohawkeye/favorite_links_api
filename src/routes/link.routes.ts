import { Router } from 'express';
import {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
} from '../controllers/link.controller';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.use(authenticate);

router.get('/', getLinks);
router.post('/', createLink);
router.put('/:id', updateLink);
router.delete('/:id', deleteLink);

export default router;
