const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error internally
  logger.error(`[${req.method}] ${req.originalUrl} >> ${message}`);

  // Send a sanitized, consistent format to the client
  res.status(status).json({
    status,
    message: status === 500 ? 'An unexpected error occurred.' : message,
  });
};

module.exports = errorHandler;