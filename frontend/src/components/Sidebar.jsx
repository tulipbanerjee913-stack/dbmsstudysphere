import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  FolderArchive,
  FileCheck2,
  HelpCircle,
  CalendarCheck,
  TrendingUp,
  User,
  LogOut,
  Users,
  Briefcase,
  Building2,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, role, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const studentNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', path: '/courses', icon: BookOpen },
    { name: 'Resources', path: '/resources', icon: FolderArchive },
    { name: 'Assignments', path: '/assignments', icon: FileCheck2 },
    { name: 'Quizzes', path: '/quizzes', icon: HelpCircle },
    { name: 'Study Planner', path: '/study-planner', icon: CalendarCheck },
    { name: 'Progress', path: '/progress', icon: TrendingUp },
  ];

  const facultyNavItems = [
    { name: 'Faculty Desk', path: '/faculty/dashboard', icon: LayoutDashboard },
    { name: 'Assigned Courses', path: '/faculty/courses', icon: BookOpen },
    { name: 'Submissions Queue', path: '/faculty/submissions', icon: FileCheck2 },
    { name: 'Student Directory', path: '/faculty/students', icon: Users },
  ];

  const adminNavItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Faculty Registry', path: '/admin/faculty', icon: Briefcase },
    { name: 'Departments', path: '/admin/departments', icon: Building2 },
    { name: 'Course Catalog', path: '/admin/courses', icon: BookOpen },
  ];

  let currentNavItems = studentNavItems;
  if (role === 'FACULTY') currentNavItems = facultyNavItems;
  if (role === 'ADMIN') currentNavItems = adminNavItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    switchRole(newRole);
    if (newRole === 'FACULTY') navigate('/faculty/dashboard');
    else if (newRole === 'ADMIN') navigate('/admin/dashboard');
    else navigate('/dashboard');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-56 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col transition-transform duration-150 ease-in-out border-r border-slate-200 dark:border-slate-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Academic Header Branding */}
        <div className="h-13 flex items-center px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded border border-slate-300 dark:border-slate-700 bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-white shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold tracking-tight text-slate-900 dark:text-white block truncate">
                StudySphere LMS
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">
                v2.4 Academic
              </span>
            </div>
          </div>
        </div>

        {/* Functional Portal View Switcher */}
        <div className="px-3 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50">
          <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            Active Portal
          </label>
          <select
            value={role}
            onChange={handleRoleChange}
            className="w-full text-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 focus:outline-none focus:border-slate-500 cursor-pointer font-medium"
          >
            <option value="STUDENT">Student (Tulip Banerjee)</option>
            <option value="FACULTY">Faculty (Prof. A)</option>
            <option value="ADMIN">Administrator (Dean Office)</option>
          </select>
        </div>

        {/* Simple Functional Navigation Links */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2.5 pb-1.5">
            {role === 'STUDENT' ? 'Academic Navigation' : role === 'FACULTY' ? 'Instruction Desk' : 'Registrar'}
          </div>

          {currentNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-2.5 py-1.5 text-xs rounded transition-colors ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border-l-2 border-slate-900 dark:border-white pl-2'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5 mr-2.5 shrink-0 text-slate-500 dark:text-slate-400" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}

          <div className="pt-3 pb-1 border-t border-slate-200 dark:border-slate-800 mt-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2.5 pb-1.5">
              Account
            </div>
            <NavLink
              to="/profile"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-2.5 py-1.5 text-xs rounded transition-colors ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border-l-2 border-slate-900 dark:border-white pl-2'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`
              }
            >
              <User className="w-3.5 h-3.5 mr-2.5 shrink-0 text-slate-500 dark:text-slate-400" />
              <span>Academic Record</span>
            </NavLink>
          </div>
        </nav>

        {/* Minimal Footer: Session Info & Logout */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/60 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <p className="text-xs font-medium text-slate-800 truncate">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-[10px] text-slate-500 font-mono truncate">
              {user?.role}
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded border border-transparent hover:border-rose-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
};
