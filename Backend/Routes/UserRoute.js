const Express = require("express");
const {
  SignUp,
  Login,
  GetMe,
  GetUsers,
} = require("../Controllers/UserController");
const { Protected } = require("../Middlewares/Protected");
const { grantAccess } = require("../Middlewares/GrantAccess");
const { CurrentUser } = require("../Middlewares/CurrentUser");

const Route = Express.Router();

// Unprotected Routes
Route.route("/signup").post(SignUp);
Route.route("/login").post(Login);

// Protected Routes
Route.use(Protected);
Route.route("/me").get(CurrentUser, GetMe);
Route.route("/").get(grantAccess("admin"), GetUsers);

module.exports = Route;
