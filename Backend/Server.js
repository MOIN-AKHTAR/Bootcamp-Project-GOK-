const Express = require("express");
const Dotenv = require("dotenv");
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
const Port = process.env.PORT || 5000;
// Listening
App.listen(Port, (err) => {
  if (err) {
    return console.log("Server Is Not Running :(");
  }
  console.log("Server Is Running On Port 5000 :)");
});
