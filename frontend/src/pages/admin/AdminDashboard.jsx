import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            System Administration
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Office of Academic Affairs • Entity Governance & Institutional Database Controls
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Role: ADMIN • Session: Active
        </div>
      </div>

      {/* Institutional Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-white border border-slate-200 rounded">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Total Students</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block font-mono">1,240</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Active matriculation</span>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Faculty Registry</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block font-mono">84</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Professors & Instructors</span>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Course Catalog</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block font-mono">48</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Approved syllabus courses</span>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Departments</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block font-mono">4</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">CSE, ECE, IT, MECH</span>
        </div>
      </div>

      {/* Directory Management Links (Compact academic tiles) */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Registry Modules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            to="/admin/students"
            className="p-3 bg-white rounded border border-slate-200 hover:bg-slate-50 transition-colors block"
          >
            <div className="font-semibold text-xs text-slate-900">Students Directory</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Enrolled records, CGPA & rolls</p>
          </Link>

          <Link
            to="/admin/faculty"
            className="p-3 bg-white rounded border border-slate-200 hover:bg-slate-50 transition-colors block"
          >
            <div className="font-semibold text-xs text-slate-900">Faculty Registry</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Instructors, titles & rooms</p>
          </Link>

          <Link
            to="/admin/departments"
            className="p-3 bg-white rounded border border-slate-200 hover:bg-slate-50 transition-colors block"
          >
            <div className="font-semibold text-xs text-slate-900">Department Units</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Academic heads & codes</p>
          </Link>

          <Link
            to="/admin/courses"
            className="p-3 bg-white rounded border border-slate-200 hover:bg-slate-50 transition-colors block"
          >
            <div className="font-semibold text-xs text-slate-900">Course Catalog</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Credit schemes & allocations</p>
          </Link>
        </div>
      </div>

      {/* Operational System Log */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Recent System Events
        </h2>
        <div className="bg-white rounded border border-slate-200">
          <table className="academic-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Operation</th>
                <th>Entity Target</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono text-xs text-slate-500">2026-10-08 02:45</td>
                <td className="text-xs font-medium text-slate-900">Semester VI Registration Audit</td>
                <td className="text-xs text-slate-600 font-mono">BATCH-2026-UG</td>
                <td><span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-medium">Completed</span></td>
              </tr>
              <tr>
                <td className="font-mono text-xs text-slate-500">2026-10-07 19:10</td>
                <td className="text-xs font-medium text-slate-900">Course Syllabus Publication</td>
                <td className="text-xs text-slate-600 font-mono">CS301, CS304</td>
                <td><span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-medium">Published</span></td>
              </tr>
              <tr>
                <td className="font-mono text-xs text-slate-500">2026-10-06 14:00</td>
                <td className="text-xs font-medium text-slate-900">Faculty Role Allocation</td>
                <td className="text-xs text-slate-600 font-mono">FAC-001 (Prof. A)</td>
                <td><span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-medium">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
