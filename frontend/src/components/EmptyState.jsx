import React from 'react';

export const EmptyState = ({ icon: Icon, title, description, actionText, onAction }) => {
  return (
    <div className="bg-white rounded border border-slate-200 p-8 text-center">
      {Icon && (
        <div className="inline-flex p-2.5 rounded bg-slate-100 text-slate-500 mb-2 border border-slate-200">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <h3 className="text-xs font-bold text-slate-800 mb-0.5">{title}</h3>
      <p className="text-[11px] text-slate-500 max-w-sm mx-auto mb-4">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-3 py-1.5 border border-slate-300 text-xs font-semibold rounded text-slate-700 bg-white hover:bg-slate-50 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
