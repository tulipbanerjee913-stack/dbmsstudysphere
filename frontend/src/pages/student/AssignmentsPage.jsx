import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileCheck2, Calendar, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { Badge } from '../../components/Badge';

const statusVariant = (s) => {
  if (s === 'EVALUATED') return 'success';
  if (s === 'LATE') return 'danger';
  if (s === 'SUBMITTED') return 'info';
  return 'warning';
};

export const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await api.getAssignments();
        setAssignments(data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const tabs = [
    { id: 'ALL', label: 'All' },
    { id: 'PENDING', label: 'Pending' },
    { id: 'SUBMITTED', label: 'Submitted' },
    { id: 'EVALUATED', label: 'Evaluated' },
    { id: 'LATE', label: 'Late' },
  ];

  const filtered = assignments.filter((a) => activeTab === 'ALL' || a.status === activeTab);

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Assignments</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Submit coursework and track evaluation status
        </p>
      </div>

      {/* Tab filter bar */}
      <div className="flex items-center border-b border-slate-200 overflow-x-auto">
        {tabs.map((tab) => {
          const count =
            tab.id === 'ALL'
              ? assignments.length
              : assignments.filter((a) => a.status === tab.id).length;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 px-4 text-xs font-semibold border-b-2 whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                isActive
                  ? 'border-slate-800 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-slate-200 text-slate-800' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Assignments table */}
      {filtered.length > 0 ? (
        <div className="bg-white border border-slate-200 rounded">
          <table className="academic-table">
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Course</th>
                <th>Due Date</th>
                <th>Max Marks</th>
                <th>Score</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.assignment_id}>
                  <td>
                    <div className="font-medium text-slate-900 text-xs">{item.title}</div>
                    {item.description && (
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {item.description}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded">
                      {item.course_code}
                    </span>
                  </td>
                  <td className="text-xs text-slate-600 whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {new Date(item.due_date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="text-xs text-slate-700 text-center">{item.maximum_marks}</td>
                  <td className="text-xs text-center">
                    {item.status === 'EVALUATED' && item.submission?.marks_obtained !== undefined ? (
                      <span className="font-semibold text-slate-900">
                        {item.submission.marks_obtained}
                        <span className="text-slate-400 font-normal"> / {item.maximum_marks}</span>
                      </span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td>
                    <Badge variant={statusVariant(item.status)}>{item.status}</Badge>
                  </td>
                  <td>
                    <Link
                      to={`/assignments/${item.assignment_id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded border border-slate-300 hover:bg-slate-50 text-slate-700 whitespace-nowrap"
                    >
                      {item.submission ? 'View' : 'Open'}
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-12 text-center border border-slate-200 rounded bg-white">
          <FileCheck2 className="w-7 h-7 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-600">No assignments in this category</p>
          <p className="text-xs text-slate-400 mt-0.5">Try selecting a different filter above</p>
        </div>
      )}
    </div>
  );
};
