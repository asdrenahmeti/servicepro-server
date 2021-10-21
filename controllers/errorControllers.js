const AppError = require("../utils/appError");
const messages = require("../validators/messages");
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.errors,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("ERROR.....: ", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const handleUniqueConstraintErrorDB = (err) => {
  const message = err.errors[0].message;
  return new AppError(message, 400);
};

const handleSequelizeErrorDB = (err) => {
  let message;
  if (err.errors[0].type === "notNull Violation") {
    message = `${err.errors[0].path} can not be null!`;
  } else {
    message = err.errors[0].message;
  }
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let development = true;
  if (development) {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    if (error.name === "SequelizeUniqueConstraintError") {
      error = handleUniqueConstraintErrorDB(error);
    }
    if (error.name === "SequelizeValidationError") {
      error = handleSequelizeErrorDB(error);
    }

    sendErrorProd(error, res);
  }
};
