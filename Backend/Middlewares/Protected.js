const Dotenv = require("dotenv");
const ExpressJwt = require("express-jwt");
Dotenv.config();
exports.Protected = ExpressJwt({
  secret: process.env.JWT_SECRETE,
  userProperty: "user",
});
