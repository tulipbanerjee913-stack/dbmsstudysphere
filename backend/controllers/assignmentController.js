const { successResponse, errorResponse } = require('../utils/response');
const { assignments, submissions, courses, modules, facultyList, users } = require('../models/mockDb');

const getAssignments = async (req, res, next) => {
  try {
    const studentId = req.user?.roleData?.student_id || 1;
    const { status, course_id } = req.query;

    const enrichedAssignments = assignments.map(a => {
      const course = courses.find(c => c.course_id === a.course_id);
      const mod = modules.find(m => m.module_id === a.module_id);
      const submission = submissions.find(s => s.assignment_id === a.assignment_id && s.student_id === studentId);

      let computedStatus = 'PENDING';
      const isPastDue = new Date(a.due_date) < new Date();

      if (submission) {
        computedStatus = submission.status; // 'SUBMITTED', 'EVALUATED', or 'LATE'
      } else if (isPastDue) {
        computedStatus = 'LATE';
      }

      return {
        ...a,
        course_code: course?.course_code,
        course_name: course?.course_name,
        module_title: mod?.module_title,
        status: computedStatus,
        submission: submission || null
      };
    });

    let results = enrichedAssignments;
    if (course_id) {
      results = results.filter(a => a.course_id === parseInt(course_id));
    }
    if (status && status !== 'ALL') {
      results = results.filter(a => a.status.toUpperCase() === status.toUpperCase());
    }

    return successResponse(res, results, 'Assignments fetched successfully');
  } catch (err) {
    next(err);
  }
};

const getAssignmentById = async (req, res, next) => {
  try {
    const assignmentId = parseInt(req.params.id);
    const studentId = req.user?.roleData?.student_id || 1;

    const assignment = assignments.find(a => a.assignment_id === assignmentId);
    if (!assignment) {
      return errorResponse(res, 'Assignment not found.', 404);
    }

    const course = courses.find(c => c.course_id === assignment.course_id);
    const mod = modules.find(m => m.module_id === assignment.module_id);
    const submission = submissions.find(s => s.assignment_id === assignmentId && s.student_id === studentId);
    const faculty = facultyList.find(f => f.faculty_id === assignment.created_by);
    const facultyUser = faculty ? users.find(u => u.user_id === faculty.user_id) : null;

    let computedStatus = 'PENDING';
    const isPastDue = new Date(assignment.due_date) < new Date();

    if (submission) {
      computedStatus = submission.status;
    } else if (isPastDue) {
      computedStatus = 'LATE';
    }

    const detailed = {
      ...assignment,
      course_code: course?.course_code,
      course_name: course?.course_name,
      module_title: mod?.module_title,
      created_by_name: facultyUser ? `${facultyUser.first_name} ${facultyUser.last_name}` : 'Faculty',
      status: computedStatus,
      submission: submission || null
    };

    return successResponse(res, detailed, 'Assignment details fetched successfully');
  } catch (err) {
    next(err);
  }
};

const submitAssignment = async (req, res, next) => {
  try {
    const assignmentId = parseInt(req.params.id);
    const studentId = req.user?.roleData?.student_id || 1;
    const { submission_text, file_attachment_url } = req.body;

    const assignment = assignments.find(a => a.assignment_id === assignmentId);
    if (!assignment) {
      return errorResponse(res, 'Assignment not found.', 404);
    }

    const isPastDue = new Date() > new Date(assignment.due_date);
    const status = isPastDue ? 'LATE' : 'SUBMITTED';

    let existing = submissions.find(s => s.assignment_id === assignmentId && s.student_id === studentId);

    if (existing) {
      existing.submission_text = submission_text || existing.submission_text;
      existing.file_attachment_url = file_attachment_url || existing.file_attachment_url;
      existing.submitted_at = new Date().toISOString();
      existing.status = status;
      return successResponse(res, existing, 'Assignment re-submitted successfully');
    }

    const newSubmission = {
      submission_id: submissions.length + 1,
      assignment_id: assignmentId,
      student_id: studentId,
      submission_text: submission_text || 'Submitted online via StudySphere Portal',
      file_attachment_url: file_attachment_url || 'https://studysphere.edu/uploads/student_submission.pdf',
      submitted_at: new Date().toISOString(),
      status,
      marks_obtained: null,
      feedback: null,
      graded_by: null,
      graded_at: null
    };

    submissions.push(newSubmission);

    return successResponse(res, newSubmission, 'Assignment submitted successfully', 201);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAssignments,
  getAssignmentById,
  submitAssignment
};
