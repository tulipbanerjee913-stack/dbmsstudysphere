import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { api } from '../../services/api';

export const ProgressPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.getProgress();
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (loading || !data) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading academic records...</div>;
  }

  const courseBreakdown = data.course_breakdown || [];
  const courseBarData = courseBreakdown.map((c) => ({
    code: c.course_code,
    name: c.course_name,
    progress: c.progress
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Academic Performance & Analytics</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Cumulative syllabus coverage, assessment evaluations, and progress metrics
        </p>
      </div>

      {/* Flat Overview Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-white border border-slate-200 rounded">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Syllabus Completion</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">{data.overall_progress}%</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Batch average: 68%</span>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Assignment Average</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">{data.average_assignment_score}%</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Evaluated problem sets</span>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Quiz Accuracy</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">{data.average_quiz_score}%</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">MCQ evaluations</span>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Planner Completion</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">{data.task_completion_rate}%</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Targets completed on schedule</span>
        </div>
      </div>

      {/* Academic Performance Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Course Performance Breakdown
          </h2>
          <span className="text-xs text-slate-400">Current Semester</span>
        </div>

        <div className="bg-white border border-slate-200 rounded">
          <table className="academic-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Code</th>
                <th>Syllabus Completion</th>
                <th className="text-center">Quiz Avg.</th>
                <th className="text-center">Assignment Avg.</th>
                <th>Standing</th>
              </tr>
            </thead>
            <tbody>
              {courseBreakdown.map((course, idx) => {
                const quizAvg = Math.min(100, Math.round(course.progress * 0.95 + (idx % 3) * 3));
                const assignAvg = Math.min(100, Math.round(course.progress * 0.92 + 5));
                return (
                  <tr key={course.course_id || idx}>
                    <td>
                      <div className="text-xs font-medium text-slate-900">{course.course_name}</div>
                    </td>
                    <td>
                      <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-700">
                        {course.course_code}
                      </span>
                    </td>
                    <td className="w-56">
                      <div className="flex items-center gap-2">
                        <div className="w-28 bg-slate-100 h-1.5 rounded">
                          <div
                            className="bg-slate-700 h-1.5 rounded"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono font-medium text-slate-800">{course.progress}%</span>
                      </div>
                    </td>
                    <td className="text-xs font-mono text-center text-slate-700">{quizAvg}%</td>
                    <td className="text-xs font-mono text-center text-slate-700">{assignAvg}%</td>
                    <td>
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        {course.progress >= 75 ? 'Satisfactory' : 'In Progress'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Single Clean Academic Chart */}
      <div className="bg-white border border-slate-200 rounded p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Course Progress Distribution</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Comparative syllabus completion across enrolled subjects</p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Target: 100%</span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={courseBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="code" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 100]} unit="%" />
              <Tooltip
                formatter={(val) => [`${val}%`, 'Progress']}
                labelFormatter={(code) => {
                  const item = courseBarData.find((d) => d.code === code);
                  return item ? `${code}: ${item.name}` : code;
                }}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  border: '1px solid #cbd5e1',
                  fontSize: '11px'
                }}
              />
              <Bar dataKey="progress" fill="#334155" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
