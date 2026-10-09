import React from 'react';

export const FacultyStudents = () => {
  const students = [
    { id: 1, name: 'Tulip Banerjee', roll: '21BCSE042', email: 'student@studysphere.edu', semester: 6, cgpa: 8.92, progress: 85 },
    { id: 2, name: 'Aarav Sharma', roll: '21BCSE015', email: 'aarav.sharma@studysphere.edu', semester: 6, cgpa: 8.45, progress: 70 },
    { id: 3, name: 'Priya Nair', roll: '21BCSE078', email: 'priya.nair@studysphere.edu', semester: 6, cgpa: 9.10, progress: 95 }
  ];

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Enrolled Student Roster</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Section batch roll records and cumulative coursework completion
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded">
        <table className="academic-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Email Address</th>
              <th>Semester</th>
              <th>CGPA</th>
              <th>Syllabus Completion</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>
                  <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-semibold text-slate-700">
                    {s.roll}
                  </span>
                </td>
                <td className="font-medium text-slate-900 text-xs">{s.name}</td>
                <td className="text-slate-500 font-mono text-xs">{s.email}</td>
                <td className="text-slate-600 text-xs font-mono">Sem {s.semester}</td>
                <td className="font-mono font-bold text-slate-900 text-xs">{s.cgpa}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-100 h-1.5 rounded">
                      <div className="bg-slate-700 h-1.5 rounded" style={{ width: `${s.progress}%` }} />
                    </div>
                    <span className="font-mono text-xs text-slate-700">{s.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
