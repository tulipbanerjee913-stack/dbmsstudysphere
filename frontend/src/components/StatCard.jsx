import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, color = 'indigo', trend, onClick }) => {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      pill: 'bg-indigo-600',
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      pill: 'bg-blue-600',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      pill: 'bg-emerald-600',
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
      pill: 'bg-amber-600',
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-100',
      pill: 'bg-rose-600',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
      pill: 'bg-purple-600',
    },
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-indigo-200' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-500 tracking-tight">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-lg ${scheme.bg} ${scheme.text}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
        {trend && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            {trend}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-slate-500 mt-2 flex items-center">{subtitle}</p>}
    </div>
  );
};
