import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  FileText,
  FileCheck2,
  HelpCircle,
  Video,
  Download,
  ExternalLink,
  Clock,
  User,
  GraduationCap,
  Award,
  ArrowLeft,
  Eye
} from 'lucide-react';
import { api } from '../../services/api';
import { Badge } from '../../components/Badge';
import { ResourceReaderModal } from '../../components/ResourceReaderModal';

export const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState({ 1: true });
  const [selectedResource, setSelectedResource] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await api.getCourseById(id);
        setCourse(data);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 text-sm">Loading course details...</div>;
  }

  if (!course) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-lg font-bold text-slate-800">Course not found</h2>
        <Link to="/courses" className="text-indigo-600 text-xs mt-2 inline-block">
          ← Return to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Course Catalog</span>
        </Link>
      </div>

      {/* Academic Course Specification Header */}
      <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 bg-slate-100 border border-slate-300 rounded font-semibold text-slate-800">
                {course.course_code}
              </span>
              <span className="text-xs text-slate-500">
                {course.credits} Credits • {course.department_name}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {course.course_name}
            </h1>

            <p className="text-xs text-slate-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="bg-slate-50 rounded border border-slate-200 p-3 lg:w-64 shrink-0">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-500 font-medium">Syllabus Completion</span>
              <span className="font-mono font-bold text-slate-900">{course.progress_percentage}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded">
              <div
                className="bg-slate-800 h-1.5 rounded"
                style={{ width: `${course.progress_percentage}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1.5 block">
              {course.modules?.length || 2} Course Units • Active Semester
            </span>
          </div>
        </div>

        {/* Instructor Information */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-400">Course Instructor: </span>
            <strong className="text-slate-800">{course.faculty_name}</strong>
            <span className="text-slate-500 ml-1">({course.faculty_designation})</span>
          </div>
          <div className="text-slate-500">
            Faculty Office: <span className="font-mono text-slate-700">{course.faculty_office}</span>
          </div>
        </div>
      </div>

      {/* Modules Syllabus Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Curriculum Modules & Teaching Units
          </h2>
          <span className="text-xs text-slate-400">Expand unit to access resources</span>
        </div>

        {course.modules?.map((mod) => {
          const isExpanded = !!expandedModules[mod.module_id];
          return (
            <div
              key={mod.module_id}
              className="bg-white rounded border border-slate-200 overflow-hidden"
            >
              {/* Module Header Bar (Accordion Trigger) */}
              <button
                type="button"
                onClick={() => toggleModule(mod.module_id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-slate-300">
                    {mod.module_number}
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-900">
                      Unit {mod.module_number}: {mod.module_title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {mod.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                    {mod.estimated_hours} Hours
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </button>

              {/* Module Content Body */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-200 bg-slate-50/50 space-y-4">
                  {/* Module Resources */}
                  {mod.resources && mod.resources.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Lecture Notes & Study References
                      </h4>
                      <div className="bg-white border border-slate-200 rounded divide-y divide-slate-100">
                        {mod.resources.map((res) => (
                          <div
                            key={res.resource_id}
                            className="p-2.5 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="font-medium text-slate-900 truncate">{res.title}</span>
                              <span className="text-[10px] text-slate-400 uppercase font-mono shrink-0">[{res.resource_type}]</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setSelectedResource(res)}
                              className="text-[11px] font-semibold px-2 py-0.5 rounded border border-slate-300 hover:bg-slate-50 text-slate-700 shrink-0"
                            >
                              Read
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Module Assignments */}
                  {mod.assignments && mod.assignments.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Coursework & Submissions
                      </h4>
                      <div className="bg-white border border-slate-200 rounded divide-y divide-slate-100">
                        {mod.assignments.map((assign) => (
                          <div
                            key={assign.assignment_id}
                            className="p-2.5 flex items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <span className="font-medium text-slate-900">{assign.title}</span>
                              <span className="text-[11px] text-slate-400 ml-2">
                                Due: {new Date(assign.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} • Max: {assign.maximum_marks} pts
                              </span>
                            </div>
                            <Link
                              to={`/assignments/${assign.assignment_id}`}
                              className="text-[11px] font-semibold px-2 py-0.5 rounded border border-slate-300 hover:bg-slate-50 text-slate-700 shrink-0"
                            >
                              Open
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Module Quizzes */}
                  {mod.quizzes && mod.quizzes.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Unit Quizzes
                      </h4>
                      <div className="bg-white border border-slate-200 rounded divide-y divide-slate-100">
                        {mod.quizzes.map((q) => (
                          <div
                            key={q.quiz_id}
                            className="p-2.5 flex items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <span className="font-medium text-slate-900">{q.title}</span>
                              <span className="text-[11px] text-slate-400 ml-2 font-mono">
                                {q.duration_minutes} mins • {q.total_marks} pts
                              </span>
                            </div>
                            <Link
                              to={`/quizzes/${q.quiz_id}`}
                              className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-white hover:bg-slate-700 shrink-0"
                            >
                              Attempt
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Academic Document Reader Modal */}
      <ResourceReaderModal
        isOpen={!!selectedResource}
        onClose={() => setSelectedResource(null)}
        resource={selectedResource}
      />
    </div>
  );
};
