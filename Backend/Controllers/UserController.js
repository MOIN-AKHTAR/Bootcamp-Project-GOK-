const UserModel = require("../Models/UserModel");
const UploadsModel = require("../Models/UploadsModel");
const AsyncWrapper = require("../Utils/AsynWrapper");
const ErrorClass = require("../Utils/ErrorClass");
const SignUpValidation = require("../Validations/UserValidation/SignUpValidation");
const LogInValidation = require("../Validations/UserValidation/LoginValidation");
const _ = require("lodash");
const Cloudinary = require("cloudinary");
const Password_Generator = require("generate-password");
const ProfileValidation = require("../Validations/UserValidation/ProfileValidation");
require("../Middlewares/Cloudinary");

// @Desc   Create User
// @Route   POST api/v1/users/signup
// @Access  Public
exports.SignUp = AsyncWrapper(async (req, res, next) => {
  // Validating Inputs
  console.log(req.body);
  const { error, isValid } = SignUpValidation(req.body);
  if (!isValid) {
    return next(new ErrorClass("Validation Error", error, 400));
  }
  // Checking Whether User Does Exists In DB Or Not
  const AlreadyUser = await UserModel.findOne({ email: req.body.email });
  if (AlreadyUser) {
    return next(
      new ErrorClass(
        "Dupliaction Error",
        { email: "This Email Is Already Taken Use Anyother Email" },
        400
      )
    );
  }

  // Generating Random Password
  req.body.password = Password_Generator.generate({
    length: 10,
    numbers: true,
  });
  //   Creating User
  const User = await UserModel.create(req.body);
  if (!User) {
    return next(new ErrorClass("Couldn't Create User", undefined, 400));
  }
  // Sending Email Is Remaining
  let Time = new Date();
  console.log(
    `Dear ${
      User.name
    } Your Account Has Been Created At ${Time.getHours()}:${Time.getMinutes()}:${Time.getSeconds()} With Following Information`
  );
  console.log(User);
  res.status(200).json({
    success: true,
    data: User,
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
// @Desc    Update Profile
// @Route   PUT api/v1/users/profile
// @Access  Private
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

// @Desc    Delete Account
// @Route   DELETE api/v1/users/profile
// @Access  Private
exports.deleteProfile = AsyncWrapper(async (req, res, next) => {
  await req.user.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @Desc    GET USER'S HISTORY
// @Route   GET api/v1/users/:userid/all
// @Access  Private
exports.GetUserHistory = AsyncWrapper(async (req, res, next) => {
  const History = await UploadsModel.find({ user: req.params.userid });
  if (!History) {
    return next(new ErrorClass("Server Error", undefined, 500));
  }
  res.status(200).json({
    success: true,
    length: History.length,
    data: History,
  });
});

// @Desc    GET USER'S VIA OFFICE
// @Route   GET api/v1/users/office
// @Access  Private
exports.getUserViaOffice = AsyncWrapper(async (req, res, next) => {
  const Users = await UserModel.find({ office: req.body.office });
  if (!Users) {
    return next(new ErrorClass("Server Error", undefined, 500));
  }
  res.status(200).json({
    success: true,
    length: Users.length,
    data: Users,
  });
});

// @Desc    GET USER'S
// @Route   GET api/v1/users/:userid
// @Access  Private   (Admin)
exports.GetUser = AsyncWrapper(async (req, res, next) => {
  const User = await UserModel.findById(req.params.userid);
  if (!User) {
    return next(new ErrorClass("Couldn't Find This User"));
  }
  res.status(200).json({
    success: true,
    data: User,
  });
});

// @Desc    UPDATE USER'S OFFICE
// @Route   GET api/v1/users/:userid/office
// @Access  Private   (Admin)
exports.UpdateUserOffice = AsyncWrapper(async (req, res, next) => {
  let User = await UserModel.findById(req.params.userid);
  if (!User) {
    return next(new ErrorClass("Couldn't Find This User"));
  }
  const prevOffice = User.office;
  req.body.office =
    req.body.office && req.body.office.trim().length > 0
      ? req.body.office
      : User.office;
  User.office = req.body.office;
  await User.save();
  // Sending Email Remaining
  console.log(
    `Dear ${User.name} Your Office Has Been Changed From ${prevOffice} To ${req.body.office}`
  );
  res.status(200).json({
    success: true,
    data: User,
  });
});
