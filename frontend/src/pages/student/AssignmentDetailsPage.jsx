import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Award,
  UploadCloud,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock
} from 'lucide-react';
import { api } from '../../services/api';
import { Badge } from '../../components/Badge';

export const AssignmentDetailsPage = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getAssignmentById(id);
        setAssignment(data);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const submission = await api.submitAssignment(id, {
        submission_text: submissionText,
        file_attachment_url: `https://studysphere.edu/uploads/${fileName || 'assignment_submission.pdf'}`
      });
      setAssignment((prev) => ({
        ...prev,
        status: submission.status,
        submission
      }));
      setSuccessMsg('Your assignment has been successfully submitted for faculty evaluation!');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-xs text-slate-500">Loading assignment...</div>;
  if (!assignment) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-base font-bold text-slate-800">Assignment Not Found</h2>
        <Link to="/assignments" className="text-xs text-indigo-600 mt-2 inline-block">
          ← Return to Assignments
        </Link>
      </div>
    );
  }

  const isEvaluated = assignment.status === 'EVALUATED';
  const isSubmitted = assignment.status === 'SUBMITTED' || isEvaluated;

  return (
    <div className="space-y-5">
      <Link
        to="/assignments"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Assignments</span>
      </Link>

      {/* Main Assignment Container */}
      <div className="bg-white rounded border border-slate-200 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[11px] px-1.5 py-0.2 bg-slate-100 border border-slate-300 rounded font-semibold text-slate-700">
                {assignment.course_code}
              </span>
              <span className="text-xs text-slate-400">
                {assignment.course_name}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {assignment.title}
            </h1>
          </div>
          <Badge variant={isEvaluated ? 'success' : isSubmitted ? 'info' : 'warning'}>
            {assignment.status}
          </Badge>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-b border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 text-[11px] block">Due Date</span>
            <div className="flex items-center gap-1 font-semibold text-slate-700 mt-0.5">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{new Date(assignment.due_date).toLocaleDateString()}</span>
            </div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Maximum Marks</span>
            <span className="font-semibold text-slate-700 mt-0.5 block">{assignment.maximum_marks} Points</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Weightage</span>
            <span className="font-semibold text-slate-700 mt-0.5 block">{assignment.weightage_percent || 10}%</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Late Policy</span>
            <span className="font-semibold text-slate-700 mt-0.5 block">
              {assignment.allow_late_submission ? 'Late submission allowed' : 'Strict deadline'}
            </span>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="py-2 border-b border-slate-100">
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Problem Description & Specifications
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-normal">
            {assignment.description}
          </p>
        </div>

        {/* Evaluation Feedback (if evaluated) */}
        {isEvaluated && assignment.submission && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold text-slate-900">Grading Result</h4>
              </div>
              <span className="text-xs font-mono font-bold text-slate-900">
                Score: {assignment.submission.marks_obtained} / {assignment.maximum_marks}
              </span>
            </div>
            {assignment.submission.feedback && (
              <p className="text-xs text-slate-600 pt-1 border-t border-slate-200">
                <strong>Instructor Feedback:</strong> {assignment.submission.feedback}
              </p>
            )}
          </div>
        )}

        {/* Submission Section */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            {isSubmitted ? 'Submitted Work' : 'Submit Coursework'}
          </h3>

          {successMsg && (
            <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {isSubmitted && assignment.submission ? (
            <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <div className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>Submitted on: {new Date(assignment.submission.submitted_at).toLocaleString()}</span>
                </div>
                <Badge variant={assignment.submission.status === 'LATE' ? 'danger' : 'info'}>
                  {assignment.submission.status}
                </Badge>
              </div>

              <div className="p-2.5 bg-white rounded border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-mono text-slate-800">
                    {assignment.submission.file_attachment_url?.split('/').pop() || 'submission.zip'}
                  </span>
                </div>
                <a
                  href={assignment.submission.file_attachment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-700 hover:text-slate-900 underline text-[11px]"
                >
                  Download File
                </a>
              </div>

              {assignment.submission.submission_text && (
                <div className="p-2.5 bg-white rounded border border-slate-200 text-slate-700 text-xs">
                  {assignment.submission.submission_text}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Submission Notes / Summary
                </label>
                <textarea
                  rows={4}
                  required
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Summarize your solution, assumptions, or implementation details..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-slate-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Attach Solution File (PDF, ZIP, SQL)
                </label>
                <div className="border border-dashed border-slate-300 rounded p-4 text-center bg-slate-50/50">
                  <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                  <p className="text-xs text-slate-600">
                    Select your solution file:{' '}
                    <label className="text-slate-900 font-semibold cursor-pointer underline">
                      Browse
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setFileName(e.target.files[0]?.name || '')}
                      />
                    </label>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Accepted formats: .pdf, .zip, .sql (Max: 25 MB)
                  </p>
                  {fileName && (
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-mono text-slate-800">
                      <FileText className="w-3 h-3 text-slate-500" />
                      <span>{fileName}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded transition-colors flex items-center justify-center gap-1.5"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>{submitting ? 'Submitting...' : 'Submit Deliverable'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
