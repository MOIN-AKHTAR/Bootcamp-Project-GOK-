const UserModel = require("../Models/UserModel");
const AsyncWrapper = require("../Utils/AsynWrapper");
const ErrorClass = require("../Utils/ErrorClass");
const SignUpValidation = require("../Validations/UserValidation/SignUpValidation");
const LogInValidation = require("../Validations/UserValidation/LoginValidation");
const _ = require("lodash");
const Cloudinary = require("cloudinary");
const ProfileValidation = require("../Validations/UserValidation/ProfileValidation");
require("../Middlewares/Cloudinary");

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
  if (req.file) {
    console.log(req.body);
    const Result = await Cloudinary.v2.uploader.upload(req.file.path);
    req.body.pic = Result.secure_url;
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
  const { error, isValid } = LogInValidation(req.body);
  if (!isValid) {
    return next(new ErrorClass("Validation Error", error, 400));
  }
  const User = await UserModel.findOne({ email: req.body.email });

  if (!User) {
    return next(new ErrorClass("Invalid Email Or Password", undefined, 404));
  }
  const isCorrectPassword = await User.matchPassword(req.body.password);
  if (!isCorrectPassword) {
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
  res.status(200).json({ data: req.user });
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

exports.UpdateProfile = AsyncWrapper(async (req, res, next) => {
  if (req.file) {
    const Result = await Cloudinary.v2.uploader.upload(req.file.path);
    req.body.pic = Result.secure_url;
  } else {
    req.body.pic = req.user.pic;
  }
  req.body.password = req.body.password ? req.body.password : req.user.password;
  const { error, isValid } = ProfileValidation(req.body);
  if (!isValid) {
    return next(new ErrorClass("Validation Error", error, 400));
  }
  req.user = _.extend(req.user, req.body);
  await req.user.save();
  res.status(200).json({
    success: true,
    data: req.user,
  });
});
