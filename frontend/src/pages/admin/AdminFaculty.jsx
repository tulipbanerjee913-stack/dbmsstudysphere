import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const AdminFaculty = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const facultyMembers = [
    { id: 1, name: 'Prof. A', code: 'FAC-CSE-012', email: 'faculty@studysphere.edu', designation: 'Associate Professor', dept: 'CSE', office: 'Cabin 304, Tech Block' },
    { id: 2, name: 'Prof. B', code: 'FAC-CSE-008', email: 'prof.b@studysphere.edu', designation: 'Assistant Professor', dept: 'CSE', office: 'Cabin 309, Tech Block' },
    { id: 3, name: 'Prof. C', code: 'FAC-CSE-019', email: 'prof.c@studysphere.edu', designation: 'Professor', dept: 'CSE', office: 'Cabin 202, Admin Wing' }
  ];

  const filtered = facultyMembers.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Faculty Registry</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Appointed instructional staff, designations, and room allocations
        </p>
      </div>

      <div className="bg-white p-2.5 rounded border border-slate-200 flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by instructor name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-slate-500 text-slate-800"
          />
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {filtered.length} Faculty members
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded">
        <table className="academic-table">
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>Faculty Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Office Location</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id}>
                <td>
                  <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-semibold text-slate-700">
                    {f.code}
                  </span>
                </td>
                <td className="font-medium text-slate-900 text-xs">{f.name}</td>
                <td className="text-slate-700 text-xs">{f.designation}</td>
                <td className="text-slate-700 font-mono text-xs">{f.dept}</td>
                <td className="text-slate-600 text-xs">{f.office}</td>
                <td className="text-slate-500 font-mono text-xs">{f.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
