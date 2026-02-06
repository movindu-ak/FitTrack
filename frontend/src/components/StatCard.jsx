export function StatCard({ title, value, icon: Icon, trend, accentColor = 'green' }) {
  const colors = {
    green: 'from-green-500/20 to-emerald-500/5 border-green-500/30 text-green-400',
    blue: 'from-blue-500/20 to-cyan-500/5 border-blue-500/30 text-blue-400',
    purple: 'from-purple-500/20 to-fuchsia-500/5 border-purple-500/30 text-purple-400',
    orange: 'from-orange-500/20 to-amber-500/5 border-orange-500/30 text-orange-400',
  };

  return (
    <div className={`rounded-xl p-6 border bg-gradient-to-br ${colors[accentColor]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-neutral-900/50">
          <Icon className={`w-6 h-6 ${colors[accentColor].split(' ')[2]}`} />
        </div>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trend.isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {trend.isPositive ? '+' : ''}
            {trend.value}
          </span>
        )}
      </div>

      <div>
        <p className="text-neutral-400 text-sm mb-1">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
