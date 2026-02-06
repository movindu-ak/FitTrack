import { Users, TrendingUp, DollarSign, AlertCircle, Calendar, Clock } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { StatCard } from '../components/StatCard';
import { CrowdLevel } from '../components/CrowdLevel';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export function AdminDashboard({ onNavigate }) {
  const attendanceData = [
    { day: 'Mon', members: 145 },
    { day: 'Tue', members: 168 },
    { day: 'Wed', members: 152 },
    { day: 'Thu', members: 178 },
    { day: 'Fri', members: 195 },
    { day: 'Sat', members: 210 },
    { day: 'Sun', members: 185 },
  ];

  const revenueData = [
    { month: 'Jul', revenue: 24500 },
    { month: 'Aug', revenue: 26800 },
    { month: 'Sep', revenue: 28200 },
    { month: 'Oct', revenue: 31500 },
    { month: 'Nov', revenue: 29800 },
    { month: 'Dec', revenue: 33200 },
    { month: 'Jan', revenue: 35600 },
  ];

  const membershipDistribution = [
    { name: 'Basic', value: 120, color: '#3b82f6' },
    { name: 'Premium', value: 85, color: '#10b981' },
    { name: 'Annual', value: 45, color: '#a855f7' },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'Peak capacity reached in Zone A', time: '10 mins ago' },
    { id: 2, type: 'info', message: 'New member registration: Sarah Johnson', time: '25 mins ago' },
    { id: 3, type: 'warning', message: 'Equipment maintenance due for Treadmill #5', time: '1 hour ago' },
  ];

  const recentBookings = [
    { id: 1, member: 'John Doe', type: 'Workout Slot', time: '6:00 AM', status: 'confirmed' },
    { id: 2, member: 'Emma Wilson', type: 'Personal Training', time: '8:00 AM', status: 'confirmed' },
    { id: 3, member: 'Mike Chen', type: 'Workout Slot', time: '9:30 AM', status: 'pending' },
    { id: 4, member: 'Sarah Davis', type: 'Personal Training', time: '5:00 PM', status: 'confirmed' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation currentPage="admin" role="admin" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-neutral-400">Monitor gym operations and analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Active Members" value="250" icon={Users} trend={{ value: '12%', isPositive: true }} accentColor="green" />
          <StatCard title="Today's Revenue" value="$2,450" icon={DollarSign} trend={{ value: '8%', isPositive: true }} accentColor="blue" />
          <StatCard title="Current Occupancy" value="35%" icon={TrendingUp} accentColor="purple" />
          <StatCard title="Bookings Today" value="42" icon={Calendar} trend={{ value: '5%', isPositive: true }} accentColor="orange" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Live Occupancy */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Live Gym Occupancy</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Live</span>
                </div>
              </div>

              <CrowdLevel level="low" percentage={35} />

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-neutral-900/50 rounded-lg p-4">
                  <p className="text-neutral-400 text-sm">Zone A</p>
                  <p className="text-white text-xl font-bold">45%</p>
                  <p className="text-yellow-400 text-xs">Moderate</p>
                </div>
                <div className="bg-neutral-900/50 rounded-lg p-4">
                  <p className="text-neutral-400 text-sm">Zone B</p>
                  <p className="text-white text-xl font-bold">28%</p>
                  <p className="text-green-400 text-xs">Low</p>
                </div>
                <div className="bg-neutral-900/50 rounded-lg p-4">
                  <p className="text-neutral-400 text-sm">Zone C</p>
                  <p className="text-white text-xl font-bold">32%</p>
                  <p className="text-green-400 text-xs">Low</p>
                </div>
              </div>
            </div>

            {/* Attendance */}
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Weekly Attendance</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Bar dataKey="members" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alerts */}
          <div className="space-y-6">
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-semibold text-white">Alerts</h3>
              </div>

              {alerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-3 mb-3">
                  <p className="text-sm text-white">{alert.message}</p>
                  <p className="text-neutral-400 text-xs">{alert.time}</p>
                </div>
              ))}
            </div>

            {/* Membership */}
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Membership Mix</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={membershipDistribution} innerRadius={60} outerRadius={80} dataKey="value">
                    {membershipDistribution.map((item, index) => (
                      <Cell key={index} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
