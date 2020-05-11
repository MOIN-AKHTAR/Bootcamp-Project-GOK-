const Cloudinary = require("cloudinary");
const Dotenv = require("dotenv");
Dotenv.config({
  path: "../.env",
});
console.log(process.env.CLOUD_API_KEY);
// Cloudinary.config({
//   cloud_name: "",
//   api_key: "",
//   api_secret: "",
// });
