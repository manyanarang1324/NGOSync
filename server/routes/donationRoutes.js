import express from 'express';
import { createDonation, getUserDonations } from '../controllers/donationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createDonation);
router.get('/my-donations', protect, getUserDonations);

export default router;
