import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const variantStyles = {
    default: 'bg-slate-50 text-slate-700 border-slate-300',
    primary: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border-rose-200',
    info: 'bg-sky-50 text-sky-800 border-sky-200',
    purple: 'bg-purple-50 text-purple-800 border-purple-200',
  };

  const statusMap = {
    PENDING: 'bg-amber-50 text-amber-800 border-amber-200',
    IN_PROGRESS: 'bg-sky-50 text-sky-800 border-sky-200',
    COMPLETED: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    SUBMITTED: 'bg-sky-50 text-sky-800 border-sky-200',
    EVALUATED: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    LATE: 'bg-rose-50 text-rose-800 border-rose-200',
    HIGH: 'bg-rose-50 text-rose-800 border-rose-200',
    MEDIUM: 'bg-amber-50 text-amber-800 border-amber-200',
    LOW: 'bg-slate-50 text-slate-700 border-slate-300',
    AVAILABLE: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    EXPIRED: 'bg-slate-100 text-slate-600 border-slate-300',
    ACTIVE: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };

  const sizeStyles = {
    xs: 'px-1.5 py-0.2 text-[10px]',
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const style = typeof children === 'string' && statusMap[children.toUpperCase()]
    ? statusMap[children.toUpperCase()]
    : (variantStyles[variant] || variantStyles.default);

  return (
    <span
      className={`inline-flex items-center font-medium rounded border ${style} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};

