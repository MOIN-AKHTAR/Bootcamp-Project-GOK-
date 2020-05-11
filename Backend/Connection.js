const Mongoose = require("mongoose");
const Dotenv = require("dotenv");
// To Read Environment Variables-
Dotenv.config({});
// Connecting With DB
Mongoose.connect(
  process.env.MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      return console.log("Not Connected To Database :(");
    }
    console.log("Connected To Database :)");
  }
);
