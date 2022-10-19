module.exports = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  err.message = err.message.replace(/^./, err.message[0].toUpperCase());

  res.statusCode = err.statusCode;

  res.json({
    success: false,
    message: err.message,
  });
};
