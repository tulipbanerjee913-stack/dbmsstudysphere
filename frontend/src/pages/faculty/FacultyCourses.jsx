import React from 'react';
import { Link } from 'react-router-dom';
import { initialCourses } from '../../data/mockData';

export const FacultyCourses = () => {
  const courses = initialCourses.filter(c => c.course_id === 1 || c.course_id === 4);

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Assigned Courses</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Curriculum delivery, syllabus units, and section allocations for active semester
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded">
        <table className="academic-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Course Title</th>
              <th>Credits</th>
              <th>Department</th>
              <th>Enrolled</th>
              <th>Units</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(c => (
              <tr key={c.course_id}>
                <td>
                  <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-semibold text-slate-700">
                    {c.course_code}
                  </span>
                </td>
                <td>
                  <div className="text-xs font-medium text-slate-900">{c.course_name}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{c.description}</div>
                </td>
                <td className="text-xs font-mono">{c.credits}</td>
                <td className="text-xs text-slate-600">{c.department_name}</td>
                <td className="text-xs font-mono">{c.total_enrolled} students</td>
                <td className="text-xs font-mono">2 modules</td>
                <td className="text-right">
                  <Link
                    to={`/courses/${c.course_id}`}
                    className="text-xs font-semibold px-2.5 py-1 rounded border border-slate-300 hover:bg-slate-50 text-slate-700 whitespace-nowrap"
                  >
                    View Curriculum
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
