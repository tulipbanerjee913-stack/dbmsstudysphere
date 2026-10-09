const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Application Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected internal server error occurred.';

  return errorResponse(res, message, statusCode, process.env.NODE_ENV === 'development' ? err.stack : null);
};

module.exports = { errorHandler };
