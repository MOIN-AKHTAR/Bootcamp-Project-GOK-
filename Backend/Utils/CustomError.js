const ErrorHandler = require("./ErrorClass");

const CustomErrorHandler = (err, req, res, next) => {
  // If We Not Going From If Conditions The Data Which Is In err Will Be Used
  let error = { ...err };
  error.message = err.message;
  if (err === "Must supply api_key") {
    const message = "Must supply api_key";
    error = new ErrorHandler(message, undefined, 400);
  }
  if (err.name === "CastError") {
    const message = "Invalid ObjectId " + err.value;
    error = new ErrorHandler(message, undefined, 400);
  }
  if (err.code === 11000) {
    const message = "Duplicate Keys Are Not Allowed";
    error = new ErrorHandler(message, undefined, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorHandler(message, undefined, 400);
  }
  if (err.name === "UnauthorizedError") {
    const message = "Please Signin To Get Token";
    error = new ErrorHandler(message, undefined, 400);
  }
  if (err.inner && err.inner.name === "TokenExpiredError") {
    const message = "Token Expired Please Signin Again To Get New Token";
    error = new ErrorHandler(message, undefined, 400);
  }

  if (err.inner && err.inner.name === "JsonWebTokenError") {
    const message = "Invalid Token Please Provide Correct Token";
    error = new ErrorHandler(message, undefined, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    errors: error.errors && error.errors,
    message: error.message && error.message,
  });
};
module.exports = CustomErrorHandler;
