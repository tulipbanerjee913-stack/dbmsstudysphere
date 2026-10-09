import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  error,
  helperText,
  id,
  className = '',
  required = false,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className=" w-full space-y-1\>
 {label && (
 <label htmlFor={inputId} className=\block text-xs font-semibold text-slate-700 dark:text-slate-300\>
 {label} {required && <span className=\text-rose-600\>*</span>}
 </label>
 )}
 <input
 ref={ref}
 id={inputId}
 aria-invalid={error ? 'true' : 'false'}
 aria-describedby={error ? ${inputId}-error : helperText ? ${inputId}-desc : undefined}
 className={w-full text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border rounded px-3 py-1.5 focus:outline-none focus:ring-1 transition-colors disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:opacity-60 }
 {...props}
 />
 {error && (
 <p id={${inputId}-error} role=\alert\ className=\text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-medium\>
 {error}
 </p>
 )}
 {!error && helperText && (
 <p id={${inputId}-desc} className=\text-[11px] text-slate-500 dark:text-slate-400 mt-1\>
 {helperText}
 </p>
 )}
 </div>
 );
});

Input.displayName = 'Input';
