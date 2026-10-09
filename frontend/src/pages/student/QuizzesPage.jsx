import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  Clock,
  Award,
  CheckCircle2,
  Play,
  ArrowRight,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { api } from '../../services/api';
import { Badge } from '../../components/Badge';

export const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await api.getQuizzes();
        setQuizzes(data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const available = quizzes.filter((q) => q.status === 'AVAILABLE');
  const completed = quizzes.filter((q) => q.status === 'COMPLETED');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Academic Assessments & Quizzes</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Timed topic-level assessments and objective evaluation
        </p>
      </div>

      {/* Available Quizzes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Available Quizzes ({available.length})
          </h2>
        </div>

        {available.length > 0 ? (
          <div className="bg-white border border-slate-200 rounded">
            <table className="academic-table">
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Course</th>
                  <th>Questions</th>
                  <th>Duration</th>
                  <th>Total Marks</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {available.map((quiz) => (
                  <tr key={quiz.quiz_id}>
                    <td>
                      <div className="text-xs font-medium text-slate-900">{quiz.title}</div>
                      {quiz.description && (
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {quiz.description}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded">
                        {quiz.course_code}
                      </span>
                    </td>
                    <td className="text-xs text-slate-600 font-mono">{quiz.question_count || 4} MCQs</td>
                    <td className="text-xs text-slate-600 font-mono">{quiz.duration_minutes} mins</td>
                    <td className="text-xs text-slate-700 font-mono">{quiz.total_marks} pts</td>
                    <td className="text-right">
                      <Link
                        to={`/quizzes/${quiz.quiz_id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                      >
                        <span>Start</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-400 bg-white rounded border border-slate-200">
            No active quizzes currently open for attempt.
          </div>
        )}
      </div>

      {/* Completed Quizzes */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Completed Assessments ({completed.length})
          </h2>
        </div>

        {completed.length > 0 ? (
          <div className="bg-white border border-slate-200 rounded">
            <table className="academic-table">
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Course</th>
                  <th>Score Obtained</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {completed.map((quiz) => {
                  const score = quiz.latest_attempt?.score_obtained ?? 4;
                  const total = quiz.total_marks || 4;
                  return (
                    <tr key={quiz.quiz_id}>
                      <td>
                        <div className="text-xs font-medium text-slate-900">{quiz.title}</div>
                        {quiz.description && (
                          <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {quiz.description}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded">
                          {quiz.course_code}
                        </span>
                      </td>
                      <td className="text-xs">
                        <span className="font-semibold text-slate-900">
                          {score} / {total}
                        </span>{' '}
                        <span className="text-slate-500 font-mono text-[11px]">
                          ({Math.round((score / total) * 100)}%)
                        </span>
                      </td>
                      <td>
                        <Badge variant="success">COMPLETED</Badge>
                      </td>
                      <td className="text-right">
                        <Link
                          to={`/quizzes/${quiz.quiz_id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors"
                        >
                          <span>Review</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-400 bg-white rounded border border-slate-200">
            No completed assessments recorded yet.
          </div>
        )}
      </div>
    </div>
  );
};
