const { successResponse } = require('../utils/response');
const { enrollments, courses, assignments, submissions, quizzes, quizAttempts, studyTasks } = require('../models/mockDb');

const getStudentProgress = async (req, res, next) => {
  try {
    const studentId = req.user?.roleData?.student_id || 1;

    // Course progress
    const studentEnrollments = enrollments.filter(e => e.student_id === studentId);
    const courseBreakdown = studentEnrollments.map(e => {
      const course = courses.find(c => c.course_id === e.course_id);
      return {
        course_id: e.course_id,
        course_code: course?.course_code,
        course_name: course?.course_name,
        credits: course?.credits,
        progress: e.progress_percentage
      };
    });

    const overallProgress = courseBreakdown.length > 0
      ? Math.round(courseBreakdown.reduce((acc, c) => acc + c.progress, 0) / courseBreakdown.length)
      : 0;

    // Assignment stats
    const studentSubmissions = submissions.filter(s => s.student_id === studentId);
    const evaluatedSubmissions = studentSubmissions.filter(s => s.status === 'EVALUATED' && s.marks_obtained !== null);
    const avgAssignmentScore = evaluatedSubmissions.length > 0
      ? Math.round(evaluatedSubmissions.reduce((acc, s) => acc + (s.marks_obtained / 100 * 100), 0) / evaluatedSubmissions.length)
      : 88;

    // Quiz stats
    const attempts = quizAttempts.filter(qa => qa.student_id === studentId);
    const avgQuizScore = attempts.length > 0
      ? Math.round(attempts.reduce((acc, qa) => acc + ((qa.score_obtained / qa.total_questions) * 100), 0) / attempts.length)
      : 85;

    // Study task stats
    const userTasks = studyTasks.filter(t => t.student_id === studentId);
    const completedTasks = userTasks.filter(t => t.status === 'COMPLETED').length;
    const taskCompletionRate = userTasks.length > 0
      ? Math.round((completedTasks / userTasks.length) * 100)
      : 0;

    // Chart-friendly datasets for Recharts
    const academicTrend = [
      { week: 'Week 1', attendance: 95, assignments: 90, quiz: 80, progress: 20 },
      { week: 'Week 2', attendance: 92, assignments: 85, quiz: 85, progress: 35 },
      { week: 'Week 3', attendance: 96, assignments: 92, quiz: 88, progress: 50 },
      { week: 'Week 4', attendance: 90, assignments: 95, quiz: 90, progress: 65 },
      { week: 'Week 5', attendance: 94, assignments: 94, quiz: 92, progress: 75 },
      { week: 'Week 6', attendance: 98, assignments: 96, quiz: 95, progress: overallProgress }
    ];

    const radarSkills = [
      { subject: 'DBMS', score: 85, fullMark: 100 },
      { subject: 'Operating Systems', score: 78, fullMark: 100 },
      { subject: 'Computer Networks', score: 72, fullMark: 100 },
      { subject: 'Data Structures', score: 90, fullMark: 100 },
      { subject: 'OOP Java', score: 65, fullMark: 100 }
    ];

    const data = {
      overall_progress: overallProgress,
      enrolled_courses_count: courseBreakdown.length,
      average_assignment_score: avgAssignmentScore,
      average_quiz_score: avgQuizScore,
      task_completion_rate: taskCompletionRate,
      course_breakdown: courseBreakdown,
      academic_trend: academicTrend,
      radar_skills: radarSkills,
      summary_counts: {
        total_courses: courseBreakdown.length,
        pending_assignments: assignments.length - studentSubmissions.length,
        upcoming_quizzes: quizzes.filter(q => !attempts.some(a => a.quiz_id === q.quiz_id)).length,
        completed_tasks: completedTasks,
        total_tasks: userTasks.length
      }
    };

    return successResponse(res, data, 'Student progress analytics fetched successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStudentProgress
};
