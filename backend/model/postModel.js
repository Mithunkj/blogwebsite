const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    title: { type: String },
    photo: { type: String },
    postdescription: { type: String },
    description: { type: String },
    // likes: [{ type: ObjectId, ref: "User" }],
    // comments: [
    //   {
    //     comment: { type: String },
    //     postedBy: { type: ObjectId, ref: "User" },
    //   },
    // ],
    postedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
