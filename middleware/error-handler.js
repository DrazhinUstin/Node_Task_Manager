const CustomError = require('../lib/custom-error');

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof CustomError) {
    return res.status(err.status).json({ success: false, message: err.message });
  }

  if (err.name === 'CastError') {
    return res
      .status(400)
      .json({ success: false, message: `Value ${err.value} cannot be cast to ${err.kind}` });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors)
        .map((error) => error.message)
        .join(', '),
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: Object.entries(err.keyValue)
        .map(([key, val]) => `${key} ${val} is already taken`)
        .join(', '),
    });
  }

  res.status(500).json({ success: false, message: 'Internal server error' });
}

module.exports = errorHandler;
