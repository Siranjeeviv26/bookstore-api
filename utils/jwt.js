const jwt = require('jsonwebtoken');
const JWT_SECRET_TOKEN = process.env.JWT_SECRET || 'your_jwt_secret';

const generateToken = (data) => {
  return jwt.sign({ userId: data.user_id, email: data.email }, JWT_SECRET_TOKEN);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET_TOKEN);
};

const validateToken = (req, res, next) => {
  const token = req.headers['authorization']; // Accept raw token only
  if (token) {
    try {
      const authData = verifyToken(token);
      req.authData = authData; // contains userId and email
      next();
    } catch (err) {
      res.status(403).json({ code: 403, message: 'Token invalid' });
    }
  } else {
    res.status(401).json({ code: 401, message: 'Token missing or malformed' });
  }
};

module.exports = {
  generateToken,
  validateToken
};
