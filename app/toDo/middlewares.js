const jwt = require('jsonwebtoken');

const SECRET_KEY = 'poka'; 

const employeeMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    if (decoded.role !== 'employee') {
      return res.status(403).json({ message: 'Forbidden: Employee only' });
      
    } else {
      return next();
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


const adminMiddleware = (req, res, next) => {
  console.log('hereeeeeee');
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    if (decoded.role !== 'admin'  ) {
      return res.status(403).json({ message: 'Forbidden: Admin only' });
      
    } else {
      return next();
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};





module.exports = {employeeMiddleware , adminMiddleware};
