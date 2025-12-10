function notFound(req, res, next) {
  res.status(404).json({
    error: true,
    message: "Endpoint not found",
  });
}

module.exports = notFound;
