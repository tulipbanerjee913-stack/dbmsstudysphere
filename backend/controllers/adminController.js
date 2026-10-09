const { successResponse } = require('../utils/response');
const { students, facultyList, courses, departments, resources, assignments, users, enrollments } = require('../models/mockDb');

const getAdminStats = async (req, res, next) => {
  try {
    const stats = {
      total_students: students.length,
      total_faculty: facultyList.length,
      total_courses: courses.length,
      total_departments: departments.length,
      total_resources: resources.length,
      total_assignments: assignments.length,
      total_enrollments: enrollments.length
    };

    const departmentOverview = departments.map(d => {
      const dCourses = courses.filter(c => c.department_id === d.department_id);
      const dFaculty = facultyList.filter(f => f.department_id === d.department_id);
      const dStudents = students.filter(s => s.department_id === d.department_id);
      return {
        ...d,
        courses_count: dCourses.length,
        faculty_count: dFaculty.length,
        students_count: dStudents.length
      };
    });

    return successResponse(res, { stats, departments: departmentOverview }, 'Admin statistics loaded');
  } catch (err) {
    next(err);
  }
};

const getAdminStudents = async (req, res, next) => {
  try {
    const list = students.map(s => {
      const u = users.find(user => user.user_id === s.user_id);
      const d = departments.find(dept => dept.department_id === s.department_id);
      return {
        ...s,
        first_name: u?.first_name,
        last_name: u?.last_name,
        email: u?.email,
        department_name: d?.department_name,
        department_code: d?.department_code
      };
    });

    return successResponse(res, list, 'Students list retrieved');
  } catch (err) {
    next(err);
  }
};

const getAdminFaculty = async (req, res, next) => {
  try {
    const list = facultyList.map(f => {
      const u = users.find(user => user.user_id === f.user_id);
      const d = departments.find(dept => dept.department_id === f.department_id);
      return {
        ...f,
        first_name: u?.first_name,
        last_name: u?.last_name,
        email: u?.email,
        department_name: d?.department_name,
        department_code: d?.department_code
      };
    });

    return successResponse(res, list, 'Faculty list retrieved');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAdminStats,
  getAdminStudents,
  getAdminFaculty
};
