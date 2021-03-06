const _ = require("lodash");
require("../Middlewares/Cloudinary");
const Cloudinary = require("cloudinary");
const UserModel = require("../Models/UserModel");
const ErrorClass = require("../Utils/ErrorClass");
const AsyncWrapper = require("../Utils/AsynWrapper");
const UploadsModel = require("../Models/UploadsModel");
const Password_Generator = require("generate-password");
const LogInValidation = require("../Validations/UserValidation/LoginValidation");
const SignUpValidation = require("../Validations/UserValidation/SignUpValidation");
const ProfileValidation = require("../Validations/UserValidation/ProfileValidation");
const { sendEmail } = require("../Middlewares/Sendgrid");

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
  const redirectTo = `http://localhost:3000/verify/${User._id}`;
  await sendEmail({
    to: User.email,
    from: "moinakhter179@gmail.com",
    subject: "Account Created",
    text: "Account Created",
    html: `<h4>Your Account Has Been Creaed With The Following Information</h4>
          <strong>Email:${User.email}</strong><br><strong>Password:${User.password}</strong><br>
          <p>For furthur detail login for your account and view your profile Thank You :)</p>
          <hr/>
          <a href=${redirectTo}>Click Here To Verify Your Account</a>`,
  });

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
  // Changing Status
  if (!User.status) {
    User.status = true;
  }
  await User.save();

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
  const Users = await UserModel.find({
    role: "user",
    office: { $regex: new RegExp(req.params.office, "i") },
  });
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
// @Desc    GET USER'S
// @Route   GET api/v1/user/year/:year
// @Access  Private   (Admin)
exports.GetUserViaYear = AsyncWrapper(async (req, res, next) => {
  const User = await UserModel.find({ year: req.params.year });
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
  await sendEmail({
    to: User.email,
    from: "moinakhter179@gmail.com",
    subject: "Account Created",
    text: "Account Created",
    html: `<h4>Dear ${User.name} Your Office Has Been Changed From ${prevOffice} To ${req.body.office}</h4>`,
  });
  res.status(200).json({
    success: true,
    data: User,
  });
});

// @Desc    GET USER'S UPLOADS VIA MONTH
// @Route   GET api/v1/users/:userid/month/:month
// @Access  Private   (Admin)
exports.GetSpecificUserUploadViaMonth = AsyncWrapper(async (req, res, next) => {
  const Uploads = await UploadsModel.find({
    user: req.params.userid,
    month: req.params.month,
  });
  res.status(200).json({
    success: true,
    data: Uploads,
  });
});

// @Desc    GET USER'S UPLOADS VIA MONTH
// @Route   GET api/v1/users/:userid/status/:status
// @Access  Private   (Admin)
exports.GetSpecificUserUploadViaStatus = AsyncWrapper(
  async (req, res, next) => {
    const Uploads = await UploadsModel.find({
      user: req.params.userid,
      status: req.params.status,
    });
    res.status(200).json({
      success: true,
      data: Uploads,
    });
  }
);

exports.VerifyAccount = AsyncWrapper(async (req, res, next) => {
  const Verified = await UserModel.findByIdAndUpdate(
    req.params.uid,
    {
      status: true,
    },
    {
      new: true,
    }
  );
  if (!Verified) {
    return next(new ErrorClass("Something Gone Wrong!!!", undefined, 500));
  }
  res.status(200).json({
    success: true,
  });
});
