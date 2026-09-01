// src/middleware/authorizeRole.js
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        status: 401,
        message: 'Authentication required prior to authorization check.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 403,
        message: `Forbidden: Access restricted to [${allowedRoles.join(', ')}] roles only.`
      });
    }

    next();
  };
};

module.exports = authorizeRole;