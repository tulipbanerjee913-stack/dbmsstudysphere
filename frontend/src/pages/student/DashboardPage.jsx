import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileCheck2,
  HelpCircle,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/Badge';
import { api } from '../../services/api';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cData, aData, qData, pData] = await Promise.all([
          api.getCourses(),
          api.getAssignments(),
          api.getQuizzes(),
          api.getProgress()
        ]);
        setCourses(cData || []);
        setAssignments(aData || []);
        setQuizzes(qData || []);
        setProgressData(pData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pendingAssignments = assignments.filter(a => a.status === 'PENDING' || a.status === 'LATE');
  const availableQuizzes = quizzes.filter(q => q.status === 'AVAILABLE');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Academic Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Thursday, 8 October 2026 · Spring Session 2026 · Semester VI (B.Tech CSE)
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-mono text-slate-600 bg-white border border-slate-300 px-2.5 py-1 rounded">
            Roll No: {user?.profile?.roll_number || '25BCE0499'}
          </span>
          <span className="text-slate-500 bg-white border border-slate-300 px-2.5 py-1 rounded">
            Dept: CSE
          </span>
        </div>
      </div>

      {/* Academic Overview Summary Panel */}
      <div className="bg-white border border-slate-200 rounded p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Academic Overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="pt-2 sm:pt-0 sm:px-3 first:pl-0">
            <span className="text-slate-500 block text-[11px]">Enrolled Courses</span>
            <span className="text-base font-bold text-slate-900 block mt-0.5">
              {courses.length || 5}
            </span>
            <span className="text-[11px] text-slate-500">18 Total Credits</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:px-3">
            <span className="text-slate-500 block text-[11px]">Pending Work</span>
            <span className="text-base font-bold text-slate-900 block mt-0.5">
              {pendingAssignments.length}
            </span>
            <span className="text-[11px] text-amber-700 font-medium">Assignments due</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:px-3">
            <span className="text-slate-500 block text-[11px]">Open Quizzes</span>
            <span className="text-base font-bold text-slate-900 block mt-0.5">
              {availableQuizzes.length}
            </span>
            <span className="text-[11px] text-slate-500">Available to take</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:px-3">
            <span className="text-slate-500 block text-[11px]">Cumulative GPA</span>
            <span className="text-base font-bold text-slate-900 block mt-0.5">
              {user?.profile?.cgpa || '8.92'}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium">Scale 10.0</span>
          </div>

          <div className="pt-2 sm:pt-0 sm:px-3">
            <span className="text-slate-500 block text-[11px]">Attendance</span>
            <span className="text-base font-bold text-slate-900 block mt-0.5">
              88.5%
            </span>
            <span className="text-[11px] text-slate-500">Good Standing</span>
          </div>
        </div>
      </div>

      {/* Main Grid: My Courses (Left) & Upcoming Deadlines (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: My Courses (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-slate-900 uppercase">
              Registered Courses
            </h2>
            <Link
              to="/courses"
              className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center"
            >
              View catalog <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded divide-y divide-slate-100">
            {courses.map((course) => (
              <div key={course.course_id} className="p-3.5 hover:bg-slate-50/70 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono font-semibold px-1.5 py-0.2 bg-slate-100 text-slate-700 border border-slate-300 rounded">
                        {course.course_code}
                      </span>
                      <Link
                        to={`/courses/${course.course_id}`}
                        className="text-xs font-semibold text-slate-900 hover:underline truncate"
                      >
                        {course.course_name}
                      </Link>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Faculty: <span className="text-slate-700 font-medium">{course.faculty_name}</span> · {course.credits} Credits
                    </p>
                  </div>
                  <div className="text-right shrink-0 w-28">
                    <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
                      <span>Progress</span>
                      <span className="font-semibold text-slate-900">{course.progress_percentage || 0}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-xs h-1.5 overflow-hidden">
                      <div
                        className="bg-slate-700 h-1.5 rounded-xs"
                        style={{ width: `${course.progress_percentage || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Upcoming Deadlines (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-slate-900 uppercase">
              Upcoming Deadlines
            </h2>
            <Link
              to="/assignments"
              className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center"
            >
              All assignments <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded divide-y divide-slate-100">
            {pendingAssignments
              .filter(a => a.status === 'PENDING' || a.status === 'LATE')
              .slice(0, 4)
              .map((assignment) => (
                <div key={assignment.assignment_id} className="p-3 text-xs flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-mono font-medium text-slate-600 bg-slate-50 border border-slate-200 px-1 py-0.2 rounded">
                        {assignment.course_code}
                      </span>
                      <Link
                        to={`/assignments`}
                        className="font-medium text-slate-900 hover:underline truncate"
                      >
                        {assignment.title}
                      </Link>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-slate-400" />
                      Due: {assignment.due_date} · Max Marks: {assignment.maximum_marks || assignment.max_marks || 100}
                    </p>
                  </div>
                  <div className="shrink-0 pt-0.5">
                    <Badge variant={assignment.status === 'LATE' ? 'danger' : 'warning'}>
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
              ))}

            {quizzes.filter(q => q.status === 'AVAILABLE').slice(0, 2).map((quiz) => (
              <div key={quiz.quiz_id} className="p-3 text-xs flex items-start justify-between gap-2 bg-slate-50/50">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-mono font-medium text-slate-600 bg-slate-50 border border-slate-200 px-1 py-0.2 rounded">
                      {quiz.course_code}
                    </span>
                    <Link
                      to={`/quizzes/${quiz.quiz_id}`}
                      className="font-medium text-slate-900 hover:underline truncate"
                    >
                      {quiz.title}
                    </Link>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Online Quiz · {quiz.total_questions} Questions · {quiz.duration_minutes} min
                  </p>
                </div>
                <div className="shrink-0 pt-0.5">
                  <Link
                    to={`/quizzes/${quiz.quiz_id}`}
                    className="px-2 py-0.5 text-[11px] font-medium bg-slate-900 text-white rounded hover:bg-slate-800"
                  >
                    Start
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Recent Activity Log */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900 uppercase">
          Recent Activity Log
        </h2>

        <div className="bg-white border border-slate-200 rounded overflow-hidden">
          <table className="academic-table">
            <thead>
              <tr>
                <th className="w-32">Date</th>
                <th>Activity Description</th>
                <th className="w-28">Course</th>
                <th className="w-40 text-right">Status / Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono text-slate-500">08 Oct 2026</td>
                <td className="font-medium text-slate-800">
                  Assignment Evaluated: Dijkstra Shortest Path Algorithm
                </td>
                <td className="font-mono text-slate-600">CS304</td>
                <td className="text-right">
                  <span className="text-emerald-700 font-semibold">95 / 100</span>
                  <span className="text-slate-400 text-[10px] block">Graded by Course Instructor</span>
                </td>
              </tr>
              <tr>
                <td className="font-mono text-slate-500">07 Oct 2026</td>
                <td className="font-medium text-slate-800">
                  Completed Assessment: Graph Traversal & Shortest Path
                </td>
                <td className="font-mono text-slate-600">CS304</td>
                <td className="text-right">
                  <span className="text-emerald-700 font-semibold">4 / 4 (100%)</span>
                  <span className="text-slate-400 text-[10px] block">11 min attempt</span>
                </td>
              </tr>
              <tr>
                <td className="font-mono text-slate-500">06 Oct 2026</td>
                <td className="font-medium text-slate-800">
                  Submitted Assignment: CIDR Subnetting & Packet Routing
                </td>
                <td className="font-mono text-slate-600">CS303</td>
                <td className="text-right">
                  <Badge variant="info">SUBMITTED</Badge>
                  <span className="text-slate-400 text-[10px] block">Awaiting Grade</span>
                </td>
              </tr>
              <tr>
                <td className="font-mono text-slate-500">04 Oct 2026</td>
                <td className="font-medium text-slate-800">
                  Completed Resource Reading: Normalization & Functional Dependencies
                </td>
                <td className="font-mono text-slate-600">CS301</td>
                <td className="text-right text-slate-500">
                  Verified Completion
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
