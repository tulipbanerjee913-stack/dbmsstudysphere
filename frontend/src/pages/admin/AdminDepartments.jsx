import React from 'react';

export const AdminDepartments = () => {
  const depts = [
    { id: 1, code: 'CSE', name: 'Computer Science and Engineering', hod: 'Prof. A', email: 'hod.cse@studysphere.edu', faculty: 28, students: 480 },
    { id: 2, code: 'ECE', name: 'Electronics and Communication', hod: 'Prof. B', email: 'hod.ece@studysphere.edu', faculty: 22, students: 360 },
    { id: 3, code: 'IT', name: 'Information Technology', hod: 'Prof. C', email: 'hod.it@studysphere.edu', faculty: 18, students: 240 },
    { id: 4, code: 'MECH', name: 'Mechanical Engineering', hod: 'Prof. D', email: 'hod.mech@studysphere.edu', faculty: 16, students: 160 }
  ];

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Academic Departments</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Institutional division units, departmental leadership, and student distributions
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded">
        <table className="academic-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Department Title</th>
              <th>Head of Department (HOD)</th>
              <th>Official Email</th>
              <th>Faculty</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {depts.map((d) => (
              <tr key={d.id}>
                <td>
                  <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-semibold text-slate-700">
                    {d.code}
                  </span>
                </td>
                <td className="font-medium text-slate-900 text-xs">{d.name}</td>
                <td className="text-xs text-slate-800">{d.hod}</td>
                <td className="text-xs text-slate-500 font-mono">{d.email}</td>
                <td className="text-xs font-mono text-slate-700">{d.faculty}</td>
                <td className="text-xs font-mono text-slate-700">{d.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
