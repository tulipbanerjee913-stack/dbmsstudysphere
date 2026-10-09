import React, { useState } from 'react';
import { FileCheck2, Award, CheckCircle2, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { Modal } from '../../components/Modal';

export const FacultySubmissions = () => {
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      student_name: 'Tulip Banerjee',
      roll_number: '21BCSE042',
      course_code: 'CS304',
      assignment_title: 'Dijkstra Shortest Path Implementation',
      submitted_at: '2026-03-11 20:30',
      status: 'EVALUATED',
      marks: 95,
      max_marks: 100,
      feedback: 'Excellent implementation with min-heap priority queue.',
      attachment: 'https://studysphere.edu/uploads/21BCSE042_assign7.zip'
    },
    {
      id: 2,
      student_name: 'Aarav Sharma',
      roll_number: '21BCSE015',
      course_code: 'CS301',
      assignment_title: 'Complex SQL Queries & Relational Algebra',
      submitted_at: '2026-03-18 16:45',
      status: 'PENDING',
      marks: null,
      max_marks: 100,
      feedback: '',
      attachment: 'https://studysphere.edu/uploads/21BCSE015_sql.zip'
    },
    {
      id: 3,
      student_name: 'Priya Nair',
      roll_number: '21BCSE078',
      course_code: 'CS301',
      assignment_title: 'Complex SQL Queries & Relational Algebra',
      submitted_at: '2026-03-19 11:20',
      status: 'PENDING',
      marks: null,
      max_marks: 100,
      feedback: '',
      attachment: 'https://studysphere.edu/uploads/21BCSE078_sql.zip'
    }
  ]);

  const [activeSubmission, setActiveSubmission] = useState(null);
  const [marksInput, setMarksInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');

  const openGradeModal = (sub) => {
    setActiveSubmission(sub);
    setMarksInput(sub.marks !== null ? sub.marks.toString() : '');
    setFeedbackInput(sub.feedback || '');
  };

  const handleSaveGrade = (e) => {
    e.preventDefault();
    if (!activeSubmission) return;

    setSubmissions(prev => prev.map(s => {
      if (s.id === activeSubmission.id) {
        return {
          ...s,
          marks: parseFloat(marksInput),
          feedback: feedbackInput,
          status: 'EVALUATED'
        };
      }
      return s;
    }));
    setActiveSubmission(null);
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Student Coursework Submissions</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review deliverables, verify problem set answers, and record marks
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded">
        <table className="academic-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Assignment Deliverable</th>
              <th>Submitted</th>
              <th>Marks</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub.id}>
                <td>
                  <div className="font-medium text-slate-900 text-xs">{sub.student_name}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{sub.roll_number}</div>
                </td>
                <td>
                  <span className="font-mono text-[11px] px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-semibold text-slate-700">
                    {sub.course_code}
                  </span>
                </td>
                <td>
                  <div className="text-xs text-slate-800">{sub.assignment_title}</div>
                </td>
                <td className="text-xs text-slate-500 font-mono whitespace-nowrap">{sub.submitted_at}</td>
                <td className="text-xs text-slate-900 font-mono font-medium">
                  {sub.marks !== null ? `${sub.marks} / ${sub.max_marks}` : '—'}
                </td>
                <td>
                  <Badge variant={sub.status === 'EVALUATED' ? 'success' : 'warning'}>
                    {sub.status}
                  </Badge>
                </td>
                <td className="text-right">
                  <button
                    onClick={() => openGradeModal(sub)}
                    className="text-xs font-semibold px-2.5 py-1 rounded border border-slate-300 hover:bg-slate-50 text-slate-700 whitespace-nowrap"
                  >
                    {sub.status === 'EVALUATED' ? 'Edit Marks' : 'Grade'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grade Modal */}
      <Modal
        isOpen={!!activeSubmission}
        onClose={() => setActiveSubmission(null)}
        title={`Grade Submission: ${activeSubmission?.student_name}`}
      >
        <form onSubmit={handleSaveGrade} className="space-y-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
            <p><strong>Assignment:</strong> {activeSubmission?.assignment_title}</p>
            <p><strong>Student:</strong> {activeSubmission?.student_name} ({activeSubmission?.roll_number})</p>
            <p>
              <strong>Attachment:</strong>{' '}
              <a href={activeSubmission?.attachment} target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                Download student file
              </a>
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Marks Obtained (Max: {activeSubmission?.max_marks})
            </label>
            <input
              type="number"
              required
              min="0"
              max={activeSubmission?.max_marks}
              step="0.5"
              value={marksInput}
              onChange={(e) => setMarksInput(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Feedback to Student</label>
            <textarea
              rows={3}
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              placeholder="Provide constructive evaluation feedback..."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
          >
            Submit Grade & Record in Database
          </button>
        </form>
      </Modal>
    </div>
  );
};
