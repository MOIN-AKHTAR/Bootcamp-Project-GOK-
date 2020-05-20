const Dotenv = require("dotenv");
const Jwt = require("jsonwebtoken");
const Mongoose = require("mongoose");
const Bcryptjs = require("bcryptjs");
const UploadModel = require("./UploadsModel");
Dotenv.config({
  path: "../.env",
});

const userSchema = Mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please Provide Your Name"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please Provide Email"],
    },
    password: {
      type: String,
      required: [true, "Please Provide Password"],
      minlength: [6, "Password Must Be 6 Character Long"],
    },
    hashedPassword: {
      type: String,
    },
    pic: {
      type: String,
      default: "No Image Yet",
    },
    // default:
    // "https://res.cloudinary.com/dlzvhqidn/image/upload/v1589491585/ikbwwwla7b225e8msfo5.png",

    role: {
      type: String,
      default: "user",
      enum: {
        values: ["admin", "user"],
        message: "Invalid Role-Role Can Be admin/user",
      },
    },
    phone_number: {
      type: String,
      trim: true,
      required: [true, "Please Provide Your Contact Number"],
    },
    office: {
      type: String,
      trim: true,
      required: [true, "Please Provide Office"],
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    month: {
      type: Number,
      default: new Date().getMonth(),
    },
  },
  {
    timestamps: true,
  }
);
// Generate Token
userSchema.methods.genToken = function () {
  return Jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

// Decrypt Hashed Password
userSchema.methods.matchPassword = async function (Password) {
  return await Bcryptjs.compare(Password, this.hashedPassword);
};

// Encrypting Password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    // Generate Salt Which Is Just A Series Of Random String Which Will Protect From Rainbow List Attacks
    const salt = await Bcryptjs.genSalt(10);
    // Hash Password With The Help Of Salt
    this.hashedPassword = await Bcryptjs.hash(this.password, salt);
  }
  next();
});

// Deleting All Upload Before Removing User Account-
userSchema.pre("remove", async function (next) {
  await UploadModel.deleteMany({
    user: this._id,
  });
  next();
});

module.exports = Mongoose.model("User", userSchema);
