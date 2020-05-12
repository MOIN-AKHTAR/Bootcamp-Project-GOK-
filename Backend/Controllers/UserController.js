const UserModel = require("../Models/UserModel");
const AsyncWrapper = require("../Utils/AsynWrapper");
const ErrorClass = require("../Utils/ErrorClass");
const SignUpValidation = require("../Validations/UserValidation/SignUpValidation");
const LogInValidation = require("../Validations/UserValidation/LoginValidation");

// @Desc   Create User
// @Route   POST api/v1/users/signup
// @Access  Public
exports.SignUp = AsyncWrapper(async (req, res, next) => {
  // Validating Inputs
  const { error, isValid } = SignUpValidation(req.body);
  if (!isValid) {
    return next(new ErrorClass("Validation Error", error, 400));
  }
  // Checking Whether User Does Exists In DB Or Not
  const AlreadyUser = await UserModel.findOne({ email: req.body.email });
  if (AlreadyUser) {
    return next(
      new ErrorClass(
        "This Email Is Already Taken Use Anyother Email",
        undefined,
        400
      )
    );
  }
  //   Creating User
  const User = await UserModel.create(req.body);
  if (!User) {
    return next(new ErrorClass("Couldn't Create User", undefined, 400));
  }
  res.status(200).json({
    success: true,
  });
});

// @Desc   Login User
// @Route   POST api/v1/users/login
// @Access  Public
exports.Login = AsyncWrapper(async (req, res, next) => {
  // Checking Validations
  const {} = LogInValidation(req.body);
  if (!isValid) {
    return next(new ErrorClass("Validation Error", error, 400));
  }
  const { email = "", password = "" } = req.body;
  const User = await UserModel.findOne({
    email,
  });

  if (User.email !== email) {
    return next(new ErrorClass("Invalid Email Or Password", undefined, 403));
  }

  const isValid = await UserModel.matchPassword(password);
  if (!isValid) {
    return next(new ErrorClass("Invalid Email Or Password", undefined, 403));
  }

  if (!User) {
    return next(new ErrorClass("Invalid Email Or Password", undefined, 403));
  }

  const Token = User.genToken();

  res.status(200).json({
    success: true,
    token: Token,
  });
});

// @Desc    Get LoggedIn User's Data
// @Route   POST api/v1/users/me
// @Access  Private
exports.GetMe = (req, res, next) => {
  res.status(200).json({});
};

// @Desc    Get All Users With Role="user"
// @Route   POST api/v1/users/
// @Access  Private
exports.GetUsers = AsyncWrapper(async (req, res, next) => {
  const Users = await UserModel.find({ role: "user" });
  if (!Users) {
    return next(new ErrorClass("Server Error", undefined, 500));
  }
  res.status(200).json({
    success: true,
    count: Users.length,
    data: Users,
  });
});
