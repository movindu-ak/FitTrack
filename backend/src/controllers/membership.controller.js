import Membership from '../models/Membership.js';
import User from '../models/User.js';

// @desc    Create new membership
// @route   POST /api/memberships
// @access  Private
export const createMembership = async (req, res) => {
  try {
    const { plan, startDate, price } = req.body;

    // Calculate end date based on plan
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + (plan === 'basic' ? 1 : plan === 'premium' ? 6 : 12));

    const membership = await Membership.create({
      user: req.user._id,
      plan,
      startDate,
      endDate,
      price
    });

    // Update user with membership reference
    await User.findByIdAndUpdate(req.user._id, { membershipId: membership._id });

    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user membership
// @route   GET /api/memberships/my
// @access  Private
export const getUserMembership = async (req, res) => {
  try {
    const membership = await Membership.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    
    if (!membership) {
      return res.status(404).json({ message: 'No membership found' });
    }

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all memberships (Admin)
// @route   GET /api/memberships
// @access  Private/Admin
export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find()
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update payment status
// @route   PUT /api/memberships/:id/payment
// @access  Private
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const membership = await Membership.findById(req.params.id);

    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    membership.paymentStatus = paymentStatus;
    await membership.save();

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
