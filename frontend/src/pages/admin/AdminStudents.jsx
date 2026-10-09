import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Badge } from '../../components/Badge';

export const AdminStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const studentList = [
    { id: 1, name: 'Tulip Banerjee', roll: '21BCSE042', email: 'student@studysphere.edu', dept: 'CSE', sem: 6, cgpa: 8.92, status: 'ACTIVE' },
    { id: 2, name: 'Aarav Sharma', roll: '21BCSE015', email: 'aarav.sharma@studysphere.edu', dept: 'CSE', sem: 6, cgpa: 8.45, status: 'ACTIVE' },
    { id: 3, name: 'Priya Nair', roll: '21BCSE078', email: 'priya.nair@studysphere.edu', dept: 'CSE', sem: 6, cgpa: 9.10, status: 'ACTIVE' }
  ];

  const filtered = studentList.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Student Directory & Registry</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Matriculated undergraduate candidates across academic departments
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-2.5 rounded border border-slate-200 flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by student name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-slate-500 text-slate-800"
          />
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Showing {filtered.length} of {studentList.length} records
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded">
        <table className="academic-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Semester</th>
              <th>CGPA</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>
                  <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-semibold text-slate-700">
                    {s.roll}
                  </span>
                </td>
                <td className="font-medium text-slate-900 text-xs">{s.name}</td>
                <td className="text-slate-500 font-mono text-xs">{s.email}</td>
                <td className="text-slate-700 font-mono text-xs">{s.dept}</td>
                <td className="text-slate-600 text-xs font-mono">Sem {s.sem}</td>
                <td className="font-mono font-bold text-slate-900 text-xs">{s.cgpa}</td>
                <td><Badge variant="success">{s.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
