module.exports = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  err.message = err.message.replace(/^./, err.message[0].toUpperCase());

  res.status(err.statusCode).json({
    success: false,
    status: err.statusCode,
    message: err.message,
  });
};
