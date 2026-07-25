import express from 'express';
import { getCampaigns, getCampaignById, createCampaign } from '../controllers/campaignController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCampaigns);
router.get('/:id', getCampaignById);
router.post('/', protect, authorize('ngo_admin', 'super_admin'), createCampaign);

export default router;
