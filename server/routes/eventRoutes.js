import express from 'express';
import { getEvents, createEvent, applyForEvent } from '../controllers/eventController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/', protect, authorize('ngo_admin', 'super_admin'), createEvent);
router.post('/:id/apply', protect, applyForEvent);

export default router;
