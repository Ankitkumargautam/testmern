export const errorJoiMiddleware = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    const errorDetails = err.error.details.map((detail) => {
      return {
        message: detail.message,
        path: detail.path.join('.'),
      };
    });
    return res.status(err.statusCode || 400).json({
      status: err.statusCode || 400,
      message:
        errorDetails.length > 0 ? errorDetails[0].message : 'Validation error',
    });
  }
  next(err);
};
