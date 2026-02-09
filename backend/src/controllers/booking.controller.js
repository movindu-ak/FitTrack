import Booking from '../models/Booking.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    const { type, date, timeSlot, trainer } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      type,
      date,
      timeSlot,
      trainer: type === 'trainer' ? trainer : undefined
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('trainer', 'name email')
      .sort({ date: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings/all
// @access  Private/Admin
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('trainer', 'name email')
      .sort({ date: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get trainer bookings
// @route   GET /api/bookings/trainer
// @access  Private/Trainer
export const getTrainerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ trainer: req.user._id })
      .populate('user', 'name email phone')
      .sort({ date: 1, timeSlot: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status (Trainer)
// @route   PUT /api/bookings/:id/status
// @access  Private/Trainer
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if trainer owns the booking
    if (booking.trainer && booking.trainer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = status;
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phone');

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Confirm booking (Trainer)
// @route   PUT /api/bookings/:id/confirm
// @access  Private/Trainer
export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if trainer owns the booking
    if (booking.trainer && booking.trainer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to confirm this booking' });
    }

    booking.status = 'confirmed';
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phone');

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel booking by trainer
// @route   PUT /api/bookings/:id/trainer-cancel
// @access  Private/Trainer
export const trainerCancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if trainer owns the booking
    if (booking.trainer && booking.trainer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phone');

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns the booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
