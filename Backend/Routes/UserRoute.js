const Express = require("express");
const {
  SignUp,
  Login,
  GetMe,
  GetUsers,
  UpdateProfile,
} = require("../Controllers/UserController");
const { Protected } = require("../Middlewares/Protected");
const { grantAccess } = require("../Middlewares/GrantAccess");
const { CurrentUser } = require("../Middlewares/CurrentUser");
const Multer = require("../Middlewares/Multer");

const Route = Express.Router();

// Unprotected Routes
Route.route("/signup").post(Multer.single("pic"), SignUp);
Route.route("/login").post(Login);

// Protected Routes
Route.use(Protected);
Route.route("/profile").put(CurrentUser, Multer.single("pic"), UpdateProfile);
Route.route("/me").get(CurrentUser, GetMe);
Route.route("/").get(grantAccess("admin"), GetUsers);

module.exports = Route;
