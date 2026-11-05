const CustomError = require('../lib/custom-error');
const jwt = require('jsonwebtoken');

function verifyUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id, username: decoded.username };

    next();
  } catch (error) {
    next(new CustomError('Unauthorized!', 401));
  }
}

module.exports = verifyUser;
