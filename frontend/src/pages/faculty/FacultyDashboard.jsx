import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/Badge';
import { initialCourses } from '../../data/mockData';

export const FacultyDashboard = () => {
  const { user } = useAuth();
  const myCourses = initialCourses.filter(c => c.course_id === 1 || c.course_id === 4); // DBMS & DSA

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Faculty Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Instructor: {user?.first_name || 'Prof.'} {user?.last_name || 'A'} • Department of Computer Science & Engineering
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Faculty ID: FAC-001 • Cabin 304
        </div>
      </div>

      {/* Flat Academic Metric Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-white border border-slate-200 rounded">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Assigned Courses</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">2</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">CS301 & CS304</span>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Pending Grading</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">2</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Awaiting evaluation</span>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Enrolled Students</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">132</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Across active sections</span>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Class Average</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">82.5%</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Continuous evaluations</span>
        </div>
      </div>

      {/* Tables Row: Assigned Courses & Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assigned Courses Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Assigned Courses</h2>
            <Link to="/faculty/courses" className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline">
              View All
            </Link>
          </div>
          <div className="bg-white border border-slate-200 rounded">
            <table className="academic-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Credits</th>
                  <th>Enrolled</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {myCourses.map(c => (
                  <tr key={c.course_id}>
                    <td>
                      <div className="text-xs font-medium text-slate-900">{c.course_name}</div>
                      <span className="font-mono text-[10px] text-slate-500">{c.course_code}</span>
                    </td>
                    <td className="text-xs font-mono">{c.credits}</td>
                    <td className="text-xs font-mono text-slate-600">64 students</td>
                    <td className="text-right">
                      <Link
                        to={`/courses/${c.course_id}`}
                        className="text-xs font-semibold px-2 py-0.5 rounded border border-slate-300 hover:bg-slate-50 text-slate-700"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submissions Requiring Attention Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Submissions for Grading</h2>
            <Link to="/faculty/submissions" className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline">
              Manage Submissions
            </Link>
          </div>
          <div className="bg-white border border-slate-200 rounded">
            <table className="academic-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Assignment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="text-xs font-medium text-slate-900">Tulip Banerjee</div>
                    <span className="font-mono text-[10px] text-slate-500">21BCSE042</span>
                  </td>
                  <td>
                    <div className="text-xs text-slate-800">Dijkstra Shortest Path</div>
                    <span className="font-mono text-[10px] text-slate-400">CS304</span>
                  </td>
                  <td>
                    <Badge variant="success">Graded (95/100)</Badge>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="text-xs font-medium text-slate-900">Aarav Sharma</div>
                    <span className="font-mono text-[10px] text-slate-500">21BCSE015</span>
                  </td>
                  <td>
                    <div className="text-xs text-slate-800">SQL Queries & Joins</div>
                    <span className="font-mono text-[10px] text-slate-400">CS301</span>
                  </td>
                  <td>
                    <Badge variant="warning">Pending</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
