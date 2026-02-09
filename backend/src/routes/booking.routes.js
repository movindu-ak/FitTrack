import express from 'express';
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
  getTrainerBookings,
  updateBookingStatus,
  confirmBooking,
  trainerCancelBooking
} from '../controllers/booking.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, getUserBookings);
router.get('/all', protect, admin, getAllBookings);
router.get('/trainer', protect, getTrainerBookings);
router.put('/:id/cancel', protect, cancelBooking);
router.put('/:id/status', protect, updateBookingStatus);
router.put('/:id/confirm', protect, confirmBooking);
router.put('/:id/trainer-cancel', protect, trainerCancelBooking);

export default router;
