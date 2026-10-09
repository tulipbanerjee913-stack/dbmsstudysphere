const { successResponse, errorResponse } = require('../utils/response');
const { courses, facultyList, users, departments, enrollments, modules, resources, assignments, quizzes } = require('../models/mockDb');

const getCourses = async (req, res, next) => {
  try {
    const studentId = req.user?.roleData?.student_id || 1;

    const enrichedCourses = courses.map(course => {
      const faculty = facultyList.find(f => f.faculty_id === course.faculty_id);
      const facultyUser = faculty ? users.find(u => u.user_id === faculty.user_id) : null;
      const dept = departments.find(d => d.department_id === course.department_id);
      const enrollment = enrollments.find(e => e.course_id === course.course_id && e.student_id === studentId);
      const courseModules = modules.filter(m => m.course_id === course.course_id);

      return {
        ...course,
        department_name: dept?.department_name,
        department_code: dept?.department_code,
        faculty_name: facultyUser ? `${facultyUser.first_name} ${facultyUser.last_name}` : 'TBA',
        faculty_designation: faculty?.designation,
        faculty_avatar: facultyUser?.avatar_url,
        progress_percentage: enrollment ? enrollment.progress_percentage : 0,
        is_enrolled: !!enrollment,
        modules_count: courseModules.length,
        total_enrolled: enrollments.filter(e => e.course_id === course.course_id).length
      };
    });

    return successResponse(res, enrichedCourses, 'Courses fetched successfully');
  } catch (err) {
    next(err);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.id);
    const studentId = req.user?.roleData?.student_id || 1;

    const course = courses.find(c => c.course_id === courseId);
    if (!course) {
      return errorResponse(res, 'Course not found.', 404);
    }

    const faculty = facultyList.find(f => f.faculty_id === course.faculty_id);
    const facultyUser = faculty ? users.find(u => u.user_id === faculty.user_id) : null;
    const dept = departments.find(d => d.department_id === course.department_id);
    const enrollment = enrollments.find(e => e.course_id === course.course_id && e.student_id === studentId);

    // Get modules with nested resources, assignments, and quizzes
    const courseModules = modules
      .filter(m => m.course_id === courseId)
      .map(mod => {
        const modResources = resources.filter(r => r.module_id === mod.module_id);
        const modAssignments = assignments.filter(a => a.module_id === mod.module_id);
        const modQuizzes = quizzes.filter(q => q.module_id === mod.module_id);

        return {
          ...mod,
          resources: modResources,
          assignments: modAssignments,
          quizzes: modQuizzes
        };
      });

    const courseResources = resources.filter(r => r.course_id === courseId);
    const courseAssignments = assignments.filter(a => a.course_id === courseId);
    const courseQuizzes = quizzes.filter(q => q.course_id === courseId);

    const detailedCourse = {
      ...course,
      department_name: dept?.department_name,
      department_code: dept?.department_code,
      faculty_name: facultyUser ? `${facultyUser.first_name} ${facultyUser.last_name}` : 'TBA',
      faculty_designation: faculty?.designation,
      faculty_qualification: faculty?.qualification,
      faculty_office: faculty?.office_room,
      faculty_avatar: facultyUser?.avatar_url,
      progress_percentage: enrollment ? enrollment.progress_percentage : 0,
      is_enrolled: !!enrollment,
      modules: courseModules,
      all_resources: courseResources,
      all_assignments: courseAssignments,
      all_quizzes: courseQuizzes
    };

    return successResponse(res, detailedCourse, 'Course details fetched successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCourses,
  getCourseById
};
