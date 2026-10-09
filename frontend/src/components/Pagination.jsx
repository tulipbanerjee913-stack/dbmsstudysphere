import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems,
  itemsPerPage,
  className = ''
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={lex flex-col sm:flex-row items-center justify-between gap-2 py-3 px-1 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 }>
      <div>
        {totalItems !== undefined && (
          <span>
            Showing <strong className=" text-slate-900 dark:text-slate-100\>{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</strong> to{' '}
 <strong className=\text-slate-900 dark:text-slate-100\>{Math.min(currentPage * itemsPerPage, totalItems)}</strong> of{' '}
 <strong className=\text-slate-900 dark:text-slate-100\>{totalItems}</strong> entries
 </span>
 )}
 </div>

 <div className=\flex items-center space-x-1\>
 <button
 onClick={() => onPageChange(currentPage - 1)}
 disabled={currentPage <= 1}
 aria-label=\Previous page\
 className=\p-1.5 rounded border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300\
 >
 <ChevronLeft className=\w-3.5 h-3.5\ />
 </button>

 <span className=\px-2 font-mono text-xs\>
 Page {currentPage} of {totalPages}
 </span>

 <button
 onClick={() => onPageChange(currentPage + 1)}
 disabled={currentPage >= totalPages}
 aria-label=\Next page\
 className=\p-1.5 rounded border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300\
 >
 <ChevronRight className=\w-3.5 h-3.5\ />
 </button>
 </div>
 </div>
 );
};
