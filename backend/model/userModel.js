const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user: { type: String },
    userName: { type: String },
    mobileNumber: { type: String },
    email: { type: String },
    password: { type: String },
    Photo: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
