import { Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function CrowdLevel({ level, percentage, showDetails = true }) {
  const config = {
    low: {
      color: 'text-green-400',
      bg: 'bg-green-500/20',
      border: 'border-green-500/30',
      gradient: 'from-green-500/20 to-green-500/5',
      label: 'Low Crowd',
      icon: TrendingDown,
    },
    medium: {
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-500/30',
      gradient: 'from-yellow-500/20 to-yellow-500/5',
      label: 'Moderate Crowd',
      icon: Minus,
    },
    high: {
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      border: 'border-red-500/30',
      gradient: 'from-red-500/20 to-red-500/5',
      label: 'High Crowd',
      icon: TrendingUp,
    },
  };

  const { color, bg, border, gradient, label, icon: Icon } = config[level];

  return (
    <div className={`rounded-xl p-4 border ${border} bg-gradient-to-br ${gradient}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Users className={`w-5 h-5 ${color}`} />
          <span className="text-white font-medium">{label}</span>
        </div>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>

      <div className="flex items-end space-x-2">
        <span className={`text-3xl font-bold ${color}`}>{percentage}%</span>
        <span className="text-neutral-400 text-sm mb-1">capacity</span>
      </div>

      {showDetails && (
        <>
          <div className="mt-3 bg-neutral-900/50 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${bg} rounded-full transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-neutral-400 text-xs mt-2">
            {level === 'low' && 'Great time to workout!'}
            {level === 'medium' && 'Moderately busy'}
            {level === 'high' && 'Peak hours - consider booking'}
          </p>
        </>
      )}
    </div>
  );
}
