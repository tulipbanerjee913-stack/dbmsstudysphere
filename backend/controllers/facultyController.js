const { successResponse, errorResponse } = require('../utils/response');
const { courses, facultyList, users, submissions, assignments, quizzes, enrollments, students, modules, resources } = require('../models/mockDb');

const getFacultyDashboard = async (req, res, next) => {
  try {
    const facultyId = req.user?.roleData?.faculty_id || 1;

    const myCourses = courses.filter(c => c.faculty_id === facultyId);
    const myAssignments = assignments.filter(a => a.created_by === facultyId);
    const myQuizzes = quizzes.filter(q => q.created_by === facultyId);

    // Submissions for my assignments
    const myAssignmentIds = myAssignments.map(a => a.assignment_id);
    const pendingSubmissions = submissions.filter(s => myAssignmentIds.includes(s.assignment_id) && s.status !== 'EVALUATED');
    const gradedSubmissions = submissions.filter(s => myAssignmentIds.includes(s.assignment_id) && s.status === 'EVALUATED');

    const totalStudentsTaught = enrollments.filter(e => myCourses.some(mc => mc.course_id === e.course_id)).length;

    const stats = {
      total_courses: myCourses.length,
      total_students: totalStudentsTaught,
      pending_grading: pendingSubmissions.length,
      evaluated_count: gradedSubmissions.length,
      total_quizzes: myQuizzes.length,
      average_class_score: 82.5
    };

    const recentSubmissionsList = submissions
      .filter(s => myAssignmentIds.includes(s.assignment_id))
      .slice(0, 5)
      .map(s => {
        const student = students.find(st => st.student_id === s.student_id);
        const stuUser = student ? users.find(u => u.user_id === student.user_id) : null;
        const assign = assignments.find(a => a.assignment_id === s.assignment_id);
        return {
          ...s,
          student_name: stuUser ? `${stuUser.first_name} ${stuUser.last_name}` : 'Student',
          roll_number: student?.roll_number,
          assignment_title: assign?.title,
          max_marks: assign?.maximum_marks
        };
      });

    return successResponse(res, { stats, courses: myCourses, recent_submissions: recentSubmissionsList }, 'Faculty dashboard loaded');
  } catch (err) {
    next(err);
  }
};

const getFacultyCourses = async (req, res, next) => {
  try {
    const facultyId = req.user?.roleData?.faculty_id || 1;
    const myCourses = courses.filter(c => c.faculty_id === facultyId).map(c => {
      const courseEnrollments = enrollments.filter(e => e.course_id === c.course_id);
      const courseAssignments = assignments.filter(a => a.course_id === c.course_id);
      const courseQuizzes = quizzes.filter(q => q.course_id === c.course_id);

      return {
        ...c,
        students_count: courseEnrollments.length,
        assignments_count: courseAssignments.length,
        quizzes_count: courseQuizzes.length
      };
    });

    return successResponse(res, myCourses, 'Faculty courses fetched');
  } catch (err) {
    next(err);
  }
};

const gradeSubmission = async (req, res, next) => {
  try {
    const submissionId = parseInt(req.params.id);
    const facultyId = req.user?.roleData?.faculty_id || 1;
    const { marks_obtained, feedback } = req.body;

    const submission = submissions.find(s => s.submission_id === submissionId);
    if (!submission) {
      return errorResponse(res, 'Submission not found.', 404);
    }

    submission.marks_obtained = parseFloat(marks_obtained);
    submission.feedback = feedback || 'Graded by faculty';
    submission.status = 'EVALUATED';
    submission.graded_by = facultyId;
    submission.graded_at = new Date().toISOString();

    return successResponse(res, submission, 'Submission graded successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFacultyDashboard,
  getFacultyCourses,
  gradeSubmission
};
