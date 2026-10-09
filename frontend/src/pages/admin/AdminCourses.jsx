import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { initialCourses } from '../../data/mockData';
import { Badge } from '../../components/Badge';

export const AdminCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = initialCourses.filter(c =>
    c.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.department_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">University Course Registry</h1>
        <p className="text-xs text-slate-500 mt-0.5">Accredited degree courses, credits, and faculty allocations</p>
      </div>

      <div className="bg-white p-2.5 rounded border border-slate-200 flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by course code, title, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-slate-500 text-slate-800"
          />
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {filtered.length} courses listed
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded">
        <table className="academic-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Department</th>
              <th>Assigned Faculty</th>
              <th>Credits</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.course_id}>
                <td>
                  <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-semibold text-slate-700">
                    {c.course_code}
                  </span>
                </td>
                <td className="font-medium text-slate-900 text-xs">{c.course_name}</td>
                <td className="text-slate-600 text-xs">{c.department_name}</td>
                <td className="text-slate-700 text-xs">{c.faculty_name}</td>
                <td className="text-xs font-mono text-slate-700">{c.credits} Credits</td>
                <td>
                  <Badge variant="success">ACTIVE</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
