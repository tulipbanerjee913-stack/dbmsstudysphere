import React, { useState } from 'react';
import { Menu, Bell, Search, CheckCircle2, AlertCircle, FileText, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { mockNotifications } from '../data/mockData';

export const Navbar = ({ setIsSidebarOpen }) => {
  const { user } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="h-13 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 transition-colors">
      {/* Left: Mobile Toggle & Institutional Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsSidebarOpen(prev => !prev)}
          className="lg:hidden p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-700"
          aria-label="Toggle navigation"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
            StudySphere Academic Portal
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:inline text-xs text-slate-500 font-normal">
            Spring 2026 Session · Semester VI
          </span>
        </div>
      </div>

      {/* Middle: Functional Search */}
      <div className="hidden sm:flex items-center flex-1 max-w-xs mx-4">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search courses, resources, tasks..."
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded pl-8 pr-3 py-1 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white"
          />
        </div>
      </div>

      {/* Right: Notification & User Record */}
      <div className="flex items-center space-x-3">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 transition-colors"
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-slate-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-1.5 w-80 bg-white rounded border border-slate-200 shadow-md py-1 z-50">
              <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Academic Notices
                  </h4>
                  <span className="text-[10px] text-slate-500">{unreadCount} unread notices</span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] font-medium text-slate-700 hover:text-slate-900 underline"
                  >
                    Mark read
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-3 py-2 text-xs hover:bg-slate-50 flex items-start space-x-2.5 ${
                      n.unread ? 'bg-slate-50/80 font-medium' : ''
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {n.type === 'grade' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      ) : n.type === 'deadline' ? (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-slate-600" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-800">{n.title}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Info */}
        <div className="flex items-center pl-2 border-l border-slate-200 space-x-2">
          <div className="text-right hidden sm:block leading-tight">
            <p className="text-xs font-semibold text-slate-900">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-[10px] text-slate-500 font-mono">
              {user?.profile?.roll_number || user?.profile?.employee_code || user?.email}
            </p>
          </div>
          <div className="w-7 h-7 rounded border border-slate-300 bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-700">
            {user?.first_name?.[0] || 'U'}{user?.last_name?.[0] || 'S'}
          </div>
        </div>
      </div>
    </header>
  );
};
