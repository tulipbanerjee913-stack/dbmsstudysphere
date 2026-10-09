import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Lock, Mail, ArrowRight, ShieldCheck, BookOpen, Sparkles, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('student@studysphere.edu');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'FACULTY') {
        navigate('/faculty/dashboard');
      } else if (user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (roleType) => {
    if (roleType === 'STUDENT') {
      setEmail('student@studysphere.edu');
      setPassword('password123');
    } else if (roleType === 'FACULTY') {
      setEmail('faculty@studysphere.edu');
      setPassword('password123');
    } else if (roleType === 'ADMIN') {
      setEmail('admin@studysphere.edu');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-slate-950 flex items-center justify-center p-4 transition-colors">
      <div className="max-w-3xl w-full bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-sm">
        {/* Left Side: Institutional Context */}
        <div className="md:col-span-5 bg-slate-900 p-6 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-mono font-bold text-sm">
                SS
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight">StudySphere</h1>
                <p className="text-[11px] text-slate-400">Academic Information System</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-100 leading-snug">
                University Learning & Course Assessment Portal
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Relational DBMS Academic Project featuring continuous evaluation, coursework submission tracking, and department registry management.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
            <span>DBMS Academic Evaluation Release</span>
            <br />
            <span>Academic Year 2026</span>
          </div>
        </div>

        {/* Right Side: Login Form & One-Click Role Previews */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
          <div className="mb-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Portal Authentication</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Sign in with institutional credentials or choose a preview identity
            </p>
          </div>

          {/* Quick Demo Login Buttons */}
          <div className="mb-5">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
              Instant Profile Selection:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('STUDENT')}
                className={`py-1.5 px-2 rounded text-xs border text-center transition-colors ${
                  email.includes('student')
                    ? 'bg-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-white font-semibold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Student
                <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">Tulip</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('FACULTY')}
                className={`py-1.5 px-2 rounded text-xs border text-center transition-colors ${
                  email.includes('faculty')
                    ? 'bg-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-white font-semibold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Faculty
                <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">Prof. A</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('ADMIN')}
                className={`py-1.5 px-2 rounded text-xs border text-center transition-colors ${
                  email.includes('admin')
                    ? 'bg-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-white font-semibold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Admin
                <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">Dean</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-3 p-2 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="student@studysphere.edu"
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded focus:outline-none focus:border-slate-500 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded focus:outline-none focus:border-slate-500 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold text-xs rounded transition-colors flex items-center justify-center gap-1.5 disabled:opacity-70"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
            First time registering?{' '}
            <Link to="/register" className="font-semibold text-slate-800 dark:text-slate-200 hover:underline">
              Create student account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
