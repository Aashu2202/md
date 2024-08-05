const { verifyToken } = require('../utils/jwtUtils');

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401);

  try {
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.sendStatus(403);
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRoles };