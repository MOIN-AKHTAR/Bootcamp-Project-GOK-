const Express = require("express");
const {
  SignUp,
  Login,
  GetMe,
  GetUsers,
  UpdateProfile,
  deleteProfile,
  GetUserHistory,
  getUserViaOffice,
  GetUser,
  UpdateUserOffice,
  GetUserViaYear,
  GetSpecificUserUploadViaMonth,
  GetSpecificUserUploadViaStatus,
  VerifyAccount,
} = require("../Controllers/UserController");
const { Protected } = require("../Middlewares/Protected");
const { grantAccess } = require("../Middlewares/GrantAccess");
const { CurrentUser } = require("../Middlewares/CurrentUser");
const Multer = require("../Middlewares/Multer");

const Route = Express.Router();

// Unprotected Routes
Route.route("/login").post(Login);
Route.route("/verify/:uid").patch(VerifyAccount);
// Protected Routes
Route.use(Protected);
Route.route("/").get(grantAccess("admin"), GetUsers);
Route.route("/signup").post(CurrentUser, grantAccess("admin"), SignUp);
Route.route("/profile")
  .put(CurrentUser, Multer.single("pic"), UpdateProfile)
  .delete(CurrentUser, deleteProfile);
Route.route("/me").get(CurrentUser, GetMe);
Route.route("/office/:office").get(grantAccess("admin"), getUserViaOffice);
Route.route("/year/:year").get(grantAccess("admin"), GetUserViaYear);
Route.route("/:userid").get(grantAccess("admin"), GetUser);
Route.route("/:userid/all/").get(grantAccess("admin"), GetUserHistory);
Route.route("/:userid/office/").put(grantAccess("admin"), UpdateUserOffice);
Route.route("/:userid/month/:month").get(
  grantAccess("admin"),
  GetSpecificUserUploadViaMonth
);

Route.route("/:userid/status/:status").get(
  grantAccess("admin"),
  GetSpecificUserUploadViaStatus
);

module.exports = Route;
