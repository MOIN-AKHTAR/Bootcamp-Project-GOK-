const UserModel = require("../Models/UserModel");
const ErrorClass = require("../Utils/ErrorClass");
const AsyncWrapper = require("../Utils/AsynWrapper");

exports.CurrentUser = AsyncWrapper(async (req, res, next) => {
  const User = await UserModel.findById(req.user.id);
  if (!User) {
    return next(new ErrorClass("This User Doesn't Exists", undefined, 404));
  }
  req.user = User;
  next();
});
