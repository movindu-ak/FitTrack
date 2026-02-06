import { Dumbbell, LayoutDashboard, Calendar, CreditCard, BarChart3, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Navigation({ currentPage, role }) {
  const navigate = useNavigate();

  const memberLinks = [
    { page: 'member-dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/member-dashboard' },
    { page: 'booking', icon: Calendar, label: 'Book Slot', path: '/booking' },
    { page: 'membership', icon: CreditCard, label: 'Membership', path: '/membership' },
  ];

  const adminLinks = [
    { page: 'admin', icon: BarChart3, label: 'Admin Panel', path: '/admin-dashboard' },
  ];

  const trainerLinks = [
    { page: 'trainer', icon: LayoutDashboard, label: 'Dashboard', path: '/trainer-dashboard' },
  ];

  const getLinks = () => {
    if (role === 'admin') return adminLinks;
    if (role === 'trainer') return trainerLinks;
    return memberLinks;
  };

  const links = getLinks();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-black/40 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-lg">
              <Dumbbell className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              FitTrack
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {links.map(({ page, icon: Icon, label, path }) => (
              <button
                key={page}
                onClick={() => navigate(path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === page
                    ? 'bg-green-500/20 text-green-400'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{label}</span>
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-all ml-4"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
