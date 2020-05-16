const Mongoose = require("mongoose");

const uploadSchema = Mongoose.Schema(
  {
    month: {
      type: Number,
      default: new Date().getMonth(),
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    pic: [
      {
        type: String,
        required: [true, "Please Provide Picture"],
      },
    ],
    amount: {
      type: Number,
      required: [true, "Please Provide Amount"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "declined", "approved"],
        message: "Invalid Status-Status Can Be pending/declined/approved",
      },
      default: "pending",
    },
    user: {
      type: Mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model("Upload", uploadSchema);
