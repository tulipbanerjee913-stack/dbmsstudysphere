const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const { successResponse, errorResponse } = require('../utils/response');
const { users, students, facultyList, admins, departments } = require('../models/mockDb');

const generateRollNumber = () => {
  const randomPart = Math.floor(Math.random() * 900 + 100);
  return `25BCE0${randomPart}`;
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Please provide both email and password.', 400);
    }

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return errorResponse(res, 'Invalid credentials. User not found.', 401);
    }

    // Check password (allow default demo pass "password123" or bcrypt check)
    let isMatch = false;
    if (password === 'password123' || password === 'admin123' || password === 'faculty123') {
      isMatch = true;
    } else {
      isMatch = await bcrypt.compare(password, user.password_hash);
    }

    if (!isMatch) {
      return errorResponse(res, 'Invalid email or password.', 401);
    }

    // Role specific details
    let roleProfile = null;
    if (user.role === 'STUDENT') {
      const student = students.find(s => s.user_id === user.user_id);
      const dept = departments.find(d => d.department_id === student?.department_id);
      roleProfile = { ...student, department_name: dept?.department_name, department_code: dept?.department_code };
    } else if (user.role === 'FACULTY') {
      const faculty = facultyList.find(f => f.user_id === user.user_id);
      const dept = departments.find(d => d.department_id === faculty?.department_id);
      roleProfile = { ...faculty, department_name: dept?.department_name, department_code: dept?.department_code };
    } else if (user.role === 'ADMIN') {
      roleProfile = admins.find(a => a.user_id === user.user_id);
    }

    const token = generateToken({
      user_id: user.user_id,
      email: user.email,
      role: user.role
    });

    const userSafe = {
      user_id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      avatar_url: user.avatar_url,
      profile: roleProfile
    };

    return successResponse(res, { token, user: userSafe }, 'Login successful');
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, role = 'STUDENT', roll_number, department_id = 1, semester = 6 } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return errorResponse(res, 'Please provide all required fields.', 400);
    }

    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return errorResponse(res, 'User with this email already exists.', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = {
      user_id: users.length + 1,
      email,
      password_hash,
      first_name,
      last_name,
      role,
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      is_active: true,
      created_at: new Date().toISOString()
    };
    users.push(newUser);

    let roleProfile = null;
    if (role === 'STUDENT') {
      const newStudent = {
        student_id: students.length + 1,
        user_id: newUser.user_id,
        roll_number: roll_number || generateRollNumber(),
        department_id: Number(department_id),
        semester: Number(semester),
        academic_year: '2022-2026',
        cgpa: 8.50
      };
      students.push(newStudent);
      const dept = departments.find(d => d.department_id === newStudent.department_id);
      roleProfile = { ...newStudent, department_name: dept?.department_name, department_code: dept?.department_code };
    }

    const token = generateToken({
      user_id: newUser.user_id,
      email: newUser.email,
      role: newUser.role
    });

    const userSafe = {
      user_id: newUser.user_id,
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      role: newUser.role,
      avatar_url: newUser.avatar_url,
      profile: roleProfile
    };

    return successResponse(res, { token, user: userSafe }, 'Registration successful', 201);
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    return successResponse(res, { user }, 'User retrieved successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
  getMe
};
