import { useNavigate } from 'react-router-dom';
import { Dumbbell, LogOut } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const TrainerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
      {/* Header */}
      <header className="bg-neutral-800/50 backdrop-blur-sm border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <Dumbbell className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">FitTrack</h1>
                <p className="text-sm text-gray-400">Trainer Dashboard</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="secondary">
              <LogOut className="h-4 w-4 mr-2 inline" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Welcome, {user.name}!
          </h2>
          <p className="text-gray-400">
            This is your trainer dashboard. You're logged in as a <span className="text-white font-semibold">{user.role}</span>.
          </p>
          
          <div className="mt-8 p-6 bg-neutral-700/50 rounded-lg border border-neutral-600">
            <h3 className="text-lg font-semibold text-white mb-2">Coming Soon</h3>
            <p className="text-gray-400">
              Trainer features including class management, member tracking, and schedule management will be available soon.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
