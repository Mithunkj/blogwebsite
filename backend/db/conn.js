const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/BLOG");
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(`connect filed :${err}`);
    next(err);
  }
};

module.exports = connectDB;
