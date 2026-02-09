import { useState, useEffect } from 'react';
import { Calendar, Clock, CreditCard, UserCircle, Dumbbell, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { CrowdLevel } from '../components/CrowdLevel';
import { StatCard } from '../components/StatCard';

export function MemberDashboard() {
  const navigate = useNavigate();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [user, setUser] = useState(null);
  const [membership, setMembership] = useState(null);

  useEffect(() => {
    fetchBookings();
    fetchUserProfile();
    
    // Load user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMembership(data.membershipId);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Filter for upcoming bookings (future dates, excluding completed)
        const now = new Date();
        const upcoming = data
          .filter(booking => {
            const bookingDate = new Date(booking.date);
            return bookingDate >= now && booking.status !== 'completed';
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 5); // Show next 5 bookings
        
        setUpcomingBookings(upcoming);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        // Refresh bookings after cancellation
        fetchBookings();
        alert('Booking cancelled successfully');
      } else {
        alert('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Error cancelling booking');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      processing: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      confirmed: 'bg-green-500/20 text-green-400 border border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border border-red-500/30',
      completed: 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
    };

    const statusLabels = {
      processing: 'Pending',
      confirmed: 'Confirmed',
      cancelled: 'Cancelled',
      completed: 'Completed'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || statusStyles.processing}`}>
        {statusLabels[status] || status}
      </span>
    );
  };

  // Get next session info
  const getNextSession = () => {
    if (upcomingBookings.length === 0) {
      return 'No bookings';
    }

    const nextBooking = upcomingBookings[0];
    const bookingDate = new Date(nextBooking.date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Reset hours for comparison
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    bookingDate.setHours(0, 0, 0, 0);

    if (bookingDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (bookingDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else {
      const diffTime = bookingDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `In ${diffDays} days`;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage="member-dashboard" role="member" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome, {user?.name || 'Member'}!
          </h1>
          <p className="text-neutral-400">Here's your fitness overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Workouts This Month"
            value="12"
            icon={Dumbbell}
            trend={{ value: '15%', isPositive: true }}
            accentColor="green"
          />
          <StatCard
            title="Active Membership"
            value={membership?.planName || 'No Plan'}
            icon={CreditCard}
            accentColor="blue"
          />
          <StatCard
            title="Next Session"
            value={loadingBookings ? 'Loading...' : getNextSession()}
            icon={Clock}
            accentColor="purple"
          />
          <StatCard
            title="Streak Days"
            value="8"
            icon={TrendingUp}
            trend={{ value: '2 days', isPositive: true }}
            accentColor="orange"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Crowd Status */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Live Gym Status</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Live</span>
                </div>
              </div>
              <CrowdLevel level="low" percentage={35} />
            </div>

            {/* Upcoming Bookings */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Upcoming Sessions</h2>
                <button
                  onClick={() => navigate('/booking')}
                  className="text-green-400 hover:text-green-300 text-sm font-medium"
                >
                  Book New
                </button>
              </div>

              {loadingBookings ? (
                <div className="text-center py-8">
                  <p className="text-neutral-400">Loading bookings...</p>
                </div>
              ) : upcomingBookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                  <p className="text-neutral-400 mb-4">No upcoming bookings</p>
                  <button
                    onClick={() => navigate('/booking')}
                    className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    Book Your First Session
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-4 hover:border-green-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Calendar className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">
                              {booking.type === 'trainer' ? 'Personal Training' : 'Workout Slot'}
                            </span>
                          </div>
                          <p className="text-neutral-400 text-sm mb-1">
                            {formatDate(booking.date)}
                          </p>
                          <p className="text-neutral-300 text-sm">{booking.timeSlot}</p>
                          {booking.trainer && (
                            <p className="text-green-400 text-sm mt-2">
                              with {booking.trainer.name}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(booking.status)}
                          {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                            <button 
                              onClick={() => handleCancelBooking(booking._id)}
                              className="text-red-400 hover:text-red-300 text-sm mt-2"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                      {booking.status === 'processing' && (
                        <div className="mt-3 pt-3 border-t border-neutral-700">
                          <p className="text-yellow-400 text-xs flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Waiting for trainer confirmation
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Membership Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg shadow-green-500/20">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-green-100 text-sm mb-1">Membership</p>
                  <h3 className="text-2xl font-bold">Premium</h3>
                </div>
                <UserCircle className="w-12 h-12 text-green-100" />
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-green-100">Member ID</span>
                  <span className="font-semibold">#FT-2024-1847</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-100">Valid Until</span>
                  <span className="font-semibold">Dec 31, 2026</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-100">Plan Type</span>
                  <span className="font-semibold">Annual</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/membership')}
                className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg font-medium transition-all backdrop-blur-sm"
              >
                Manage Membership
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/booking')}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-black py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Workout Slot</span>
                </button>

                <button className="w-full bg-neutral-700 hover:bg-neutral-600 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2">
                  <Dumbbell className="w-4 h-4" />
                  <span>Hire Trainer</span>
                </button>

                <button
                  onClick={() => navigate('/membership')}
                  className="w-full bg-neutral-700 hover:bg-neutral-600 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>View Payments</span>
                </button>
              </div>
            </div>

            {/* Workout Streak */}
            <div className="bg-gradient-to-br from-purple-500/20 to-fuchsia-500/5 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Current Streak</p>
                  <p className="text-white text-2xl font-bold">8 Days</p>
                </div>
              </div>
              <p className="text-neutral-400 text-sm">
                Keep it up! You're on fire 🔥
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
