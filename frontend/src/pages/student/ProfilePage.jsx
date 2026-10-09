import React from 'react';
import {
  User,
  GraduationCap,
  Building2,
  Mail,
  Award,
  Calendar,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/Badge';

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Student Academic Record</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Institutional identity and department enrollment details
        </p>
      </div>

      {/* Main Profile Info Panel */}
      <div className="bg-white rounded border border-slate-200 p-5 space-y-5">
        <div className="flex flex-col sm:flex-row items-start gap-4 pb-4 border-b border-slate-100">
          <div className="w-16 h-16 rounded bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 font-bold text-lg font-mono shrink-0">
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </div>
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                {user?.first_name} {user?.last_name}
              </h2>
              <Badge variant="primary">{user?.role}</Badge>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              {user?.email}
            </div>
            <div className="text-xs text-slate-700 font-medium">
              {user?.profile?.department_name || 'Computer Science and Engineering'}
            </div>
          </div>
        </div>

        {/* Academic Attributes Grid */}
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
            Enrollment Specifications
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3.5 rounded border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[11px]">Roll Number</span>
              <span className="font-mono font-semibold text-slate-800 mt-0.5 block">{user?.profile?.roll_number || '25BCE0499'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Department</span>
              <span className="font-mono font-semibold text-slate-800 mt-0.5 block">{user?.profile?.department_code || 'CSE'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Semester</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">Semester {user?.profile?.semester || 6}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Cumulative GPA</span>
              <span className="font-mono font-bold text-slate-900 mt-0.5 block">{user?.profile?.cgpa || '8.92'} / 10.0</span>
            </div>
          </div>
        </div>

        {/* Database Relational Integrity Specs */}
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
            Relational DBMS Identifiers
          </h3>
          <table className="academic-table">
            <thead>
              <tr>
                <th>Entity Table</th>
                <th>Attribute Key</th>
                <th>Assigned Key Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>users</td>
                <td className="font-mono text-xs">user_id (PK)</td>
                <td className="font-mono text-xs text-slate-900 font-bold">{user?.user_id || 1}</td>
              </tr>
              <tr>
                <td>students</td>
                <td className="font-mono text-xs">student_id (PK)</td>
                <td className="font-mono text-xs text-slate-900 font-bold">{user?.profile?.student_id || 1}</td>
              </tr>
              <tr>
                <td>departments</td>
                <td className="font-mono text-xs">department_id (FK)</td>
                <td className="font-mono text-xs text-slate-900 font-bold">1 (Computer Science)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
