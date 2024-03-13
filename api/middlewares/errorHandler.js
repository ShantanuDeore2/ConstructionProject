const logger = require("../../utils/logger");

class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Add a "message" property
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class AuthenticationError extends AppError {
  constructor(message = "Authentication Error") {
    super(message, 401);
  }
}

class DuplicateRecordError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

const asyncErrorWrapper = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const errorHandlerMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  logger.error(`Error Custom: ${err.message}`);

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
    });
  } else if (process.env.NODE_ENV === "production") {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // For non-operational, unknown, or programming errors, don't leak details
      res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }
  }
};

module.exports = {
  AppError,
  NotFoundError,
  BadRequestError,
  asyncErrorWrapper,
  AuthenticationError,
  DuplicateRecordError,
  errorHandlerMiddleware,
};
