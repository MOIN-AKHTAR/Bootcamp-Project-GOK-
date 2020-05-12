const ErrorClass = require("../Utils/ErrorClass");
exports.grantAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorClass(
          `User With "${req.user.role}" Role Is Unauthorized For This Action`,
          undefined,
          403
        )
      );
    }
    next();
  };
};
