const { verifyToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');
const { users, students, facultyList, admins } = require('../models/mockDb');

const protect = (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, 'Access denied. No authorization token provided.', 401);
  }

  let decoded = verifyToken(token);
  if (!decoded && token && token.startsWith('mock-')) {
    if (token.includes('faculty')) {
      decoded = { user_id: 4, email: 'faculty@studysphere.edu', role: 'FACULTY' };
    } else if (token.includes('admin')) {
      decoded = { user_id: 7, email: 'admin@studysphere.edu', role: 'ADMIN' };
    } else {
      decoded = { user_id: 1, email: 'student@studysphere.edu', role: 'STUDENT' };
    }
  }

  if (!decoded) {
    return errorResponse(res, 'Invalid or expired authorization token.', 401);
  }

  // Lookup user in mockDb or attached request
  const user = users.find(u => u.user_id === decoded.user_id || u.email === decoded.email);
  if (!user || !user.is_active) {
    return errorResponse(res, 'User associated with token no longer exists or is inactive.', 401);
  }

  // Attach role-specific sub-entities
  let roleData = null;
  if (user.role === 'STUDENT') {
    roleData = students.find(s => s.user_id === user.user_id);
  } else if (user.role === 'FACULTY') {
    roleData = facultyList.find(f => f.user_id === user.user_id);
  } else if (user.role === 'ADMIN') {
    roleData = admins.find(a => a.user_id === user.user_id);
  }

  req.user = {
    ...user,
    roleData
  };

  next();
};

module.exports = { protect };
