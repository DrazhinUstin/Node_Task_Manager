const CustomError = require('../lib/custom-error');

function notFound(req, res, next) {
  next(new CustomError('The resource you are looking for does not exist', 404));
}

module.exports = notFound;
