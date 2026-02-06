import express from 'express';
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking
} from '../controllers/booking.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, getUserBookings);
router.get('/all', protect, admin, getAllBookings);
router.put('/:id/cancel', protect, cancelBooking);

export default router;
