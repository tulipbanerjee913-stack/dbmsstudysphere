import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Lock, Mail, User, ArrowRight, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    roll_number: '',
    department_id: 1,
    semester: 6
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded border border-slate-200 p-6 sm:p-8">
        <div className="mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded bg-slate-800 flex items-center justify-center text-white font-mono font-bold text-xs">
              SS
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900">StudySphere</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900">Student Account Registration</h1>
          <p className="text-xs text-slate-500 mt-0.5">Enroll your identity in the academic information database</p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                required
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Tulip"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-slate-500 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                required
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Banerjee"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-slate-500 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Institutional Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="student@studysphere.edu"
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-slate-500 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Roll Number</label>
              <input
                type="text"
                name="roll_number"
                required
                value={formData.roll_number}
                onChange={handleChange}
                placeholder="25BCE0499"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-slate-500 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-slate-500 text-slate-800"
              >
                <option value={6}>Semester VI</option>
                <option value={5}>Semester V</option>
                <option value={4}>Semester IV</option>
                <option value={3}>Semester III</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Account Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-slate-500 text-slate-800"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{loading ? 'Registering...' : 'Register Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-slate-800 hover:underline">
            Sign In to Portal
          </Link>
        </div>
      </div>
    </div>
  );
};
