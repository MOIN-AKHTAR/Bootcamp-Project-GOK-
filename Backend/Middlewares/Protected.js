const AsyncWrapper = require("../Utils/AsynWrapper");
const ErrorClass = require("../Utils/ErrorClass");
const UserModel = require("../Models/UserModel");
const JWT = require("jsonwebtoken");

exports.Protected = AsyncWrapper(async (req, res, next) => {
  let token;
  //   Checking Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //   Storing Token
    token = req.headers.authorization.split(" ")[1];
  }

  //   Extracting Data From Token
  const decode = await JWT.decode(token);

  if (!decode) {
    return next(
      new ErrorClass("You Are Not Authenticated For This Route", undefined, 401)
    );
  }

  const user = await UserModel.findById(decode.id);
  if (!user) {
    return next(
      new ErrorHandler(
        "You Are Not Authenticated For This Route",
        undefined,
        401
      )
    );
  }
  req.user = user;
  next();
});
