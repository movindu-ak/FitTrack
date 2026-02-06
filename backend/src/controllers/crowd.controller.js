import Booking from '../models/Booking.js';

// @desc    Get current crowd level
// @route   GET /api/crowd/current
// @access  Public
export const getCurrentCrowd = async (req, res) => {
  try {
    const now = new Date();
    const currentHour = now.getHours();

    // Get bookings for today
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    const todayBookings = await Booking.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      status: 'confirmed'
    });

    // Simulate crowd level based on time and bookings
    const totalCapacity = 100;
    let currentOccupancy = todayBookings.length;

    // Peak hours adjustment (6-9 AM, 5-8 PM)
    if ((currentHour >= 6 && currentHour <= 9) || (currentHour >= 17 && currentHour <= 20)) {
      currentOccupancy = Math.min(currentOccupancy + 20, totalCapacity);
    }

    const percentage = Math.round((currentOccupancy / totalCapacity) * 100);
    
    let level;
    if (percentage < 40) level = 'low';
    else if (percentage < 70) level = 'medium';
    else level = 'high';

    res.json({
      level,
      percentage,
      currentOccupancy,
      totalCapacity,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get crowd forecast
// @route   GET /api/crowd/forecast
// @access  Public
export const getCrowdForecast = async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date ? new Date(date) : new Date();

    const timeSlots = [
      { time: '6:00 AM - 7:30 AM', crowd: 'high' },
      { time: '8:00 AM - 9:30 AM', crowd: 'high' },
      { time: '10:00 AM - 11:30 AM', crowd: 'medium' },
      { time: '12:00 PM - 1:30 PM', crowd: 'low' },
      { time: '2:00 PM - 3:30 PM', crowd: 'low' },
      { time: '4:00 PM - 5:30 PM', crowd: 'medium' },
      { time: '6:00 PM - 7:30 PM', crowd: 'high' },
      { time: '8:00 PM - 9:30 PM', crowd: 'medium' }
    ];

    res.json({
      date: targetDate,
      forecast: timeSlots
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
