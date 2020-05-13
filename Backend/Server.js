const Express = require("express");
const Dotenv = require("dotenv");
const UserRoute = require("./Routes/UserRoute");
const UploadRoute = require("./Routes/UploadRoute");
const ErrorClass = require("./Utils/ErrorClass");
const CustomError = require("./Utils/CustomError");
const Morgan = require("morgan");
// Running Connection Script
require("./Connection");
// Configuring For Environment Variables
Dotenv.config({});
//Making App As Express App-
const App = Express();
// Inorder To Parse Request Body Object-
App.use(Express.json());
// Resolve CORS Issue Because Our Front End Will Be On Different Domain And Backend On Other
// By Default Browser Not Allowed Cross Origin Resource Shairing Because Of Some Security Purpose
App.use((req, res, next) => {
  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "*");
  // Request headers you wish to allow
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,content-type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    // Request methods you wish to allow
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    return res.status(200).json({});
  }
  next();
});

App.use(Morgan("dev"));
// Mounting Routes
App.use("/api/v1/user", UserRoute);
App.use("/api/v1/upload", UploadRoute);

// It Will Be Execute When There Is No Path To Be Found
App.all("*", (req, res, next) => {
  return next(
    new ErrorClass(
      `Unable To Find ${req.protocol}://${req.get("host")}${req.originalUrl} `,
      404
    )
  );
});

// Execute This MiddleWare When Any Error Occur
App.use(CustomError);

const Port = process.env.PORT || 5000;
// Listening
App.listen(Port, (err) => {
  if (err) {
    return console.log("Server Is Not Running :(");
  }
  console.log("Server Is Running On Port 5000 :)");
});
