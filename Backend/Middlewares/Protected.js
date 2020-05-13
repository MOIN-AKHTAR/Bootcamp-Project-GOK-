const ExpressJwt = require("express-jwt");
const Dotenv = require("dotenv");
Dotenv.config();
exports.Protected = ExpressJwt({
  secret: process.env.JWT_SECRETE,
  userProperty: "user",
});
