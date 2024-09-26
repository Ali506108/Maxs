const jwt = require('jsonwebtoken');

const SECRET_KEY = 'poka'; 

const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    if (decoded.role === 'admin') {
      return next();
    } else {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = adminMiddleware;
