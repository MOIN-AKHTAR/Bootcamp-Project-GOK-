class ErrorHandler extends Error {
  constructor(message, errors, statusCode) {
    super(message);
    this.errors = errors;
    this.statusCode = statusCode || 500;
  }
}

module.exports = ErrorHandler;
