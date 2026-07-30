import express from 'express';
import { getDemands, createDemand, contributeDemand } from '../controllers/demandController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getDemands);
router.post('/', protect, createDemand);
router.post('/:id/contribute', protect, contributeDemand);

export default router;
