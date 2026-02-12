import User from '../models/User.js';
import Booking from '../models/Booking.js';

// @desc    Get admin alerts
// @route   GET /api/alerts
// @access  Private/Admin
export const getAdminAlerts = async (req, res) => {
  try {
    const alerts = [];
    const now = new Date();

    // Check for new user registrations in last 24 hours
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const newUsers = await User.find({
      createdAt: { $gte: last24Hours },
      role: 'member'
    }).sort({ createdAt: -1 });

    // Add alerts for new user registrations
    newUsers.forEach(user => {
      const timeAgo = getTimeAgo(user.createdAt);
      alerts.push({
        id: `user-${user._id}`,
        type: 'info',
        message: `New member registration: ${user.name}`,
        time: timeAgo,
        timestamp: user.createdAt
      });
    });

    // Check current gym occupancy
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    const todayBookings = await Booking.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['confirmed', 'processing'] }
    });

    // Calculate occupancy percentage
    const totalCapacity = 100;
    let currentOccupancy = todayBookings.length;
    
    // Adjust for peak hours
    const currentHour = new Date().getHours();
    if ((currentHour >= 6 && currentHour <= 9) || (currentHour >= 17 && currentHour <= 20)) {
      currentOccupancy = Math.min(currentOccupancy + 20, totalCapacity);
    }

    const percentage = Math.round((currentOccupancy / totalCapacity) * 100);

    // Add alert if occupancy >= 75%
    if (percentage >= 75) {
      alerts.push({
        id: 'occupancy-high',
        type: 'warning',
        message: `High gym occupancy - ${percentage}% capacity reached`,
        time: 'Now',
        timestamp: new Date()
      });
    }

    // Sort alerts by timestamp (newest first)
    alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json({
      alerts: alerts.slice(0, 10), // Return max 10 alerts
      count: alerts.length,
      occupancyPercentage: percentage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to calculate time ago
const getTimeAgo = (date) => {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};
