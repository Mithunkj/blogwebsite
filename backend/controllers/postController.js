const express = require("express");
const mongoose = require("mongoose");
const Post = require("../model/postModel");
const User = require("../model/userModel");

//create new post
createPost = async (req, res) => {
  const basePath = `${req.protocol}://${req.get("host")}/public`;
  console.log(req.user);
  try {
    let post;
    if (!req.file?.filename) {
      post = new Post({
        title: req.body.title,
        postdescription: req.body.postdescription,
        description: req.body.description,
        postedBy: req.user,
      });
    } else {
      post = new Post({
        title: req.body.title,
        postdescription: req.body.postdescription,
        description: req.body.description,
        photo: `${basePath}/${req.file.filename}`,
        postedBy: req.user,
      });
    }
    post.save();
    console.log(post);
    res.json({ title: "post created", data: post });
  } catch (error) {
    console.log(error);
  }
};

//get all post
allposts = async (req, res) => {
  try {
    const allPost = await Post.find()
      .populate("postedBy", "_id userName Photo")
      .sort("-createdAt");
    res.json({ title: "ALl Posts", data: allPost });
  } catch (error) {
    console.log(error);
  }
};

//get single post by id
getPost = async (req, res) => {
  console.log("get post");
  console.log(req.params.id);
  try {
    const singlePost = await Post.findById(req.params.id).populate(
      "postedBy",
      "userName user Photo"
    );
    console.log(singlePost);
    res.json({ title: "single post", data: singlePost });
  } catch (error) {
    console.log(error);
  }
};

//update post
updatePost = async (req, res) => {
  console.log(req.params);
  console.log(req.user);
  //update image of product
  if (req.file != undefined && req.file.filename) {
    const image = `${req.protocol}://${req.get("host")}/public/${
      req.file.filename
    }`;
    req.body = { ...req.body, photo: image };
  }
  try {
    const updatePost = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json({ title: "updated post detials", data: updatePost });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "post not found" });
  }
};

//delete post
deletePost = async (req, res) => {
  console.log("delete");
  console.log(req.params.id);
  console.log(req.user);
  try {
    const deleteSinglePost = await Post.findById(req.params.id).populate(
      "postedBy",
      "_id"
    );
    console.log(deleteSinglePost);
    if (!deleteSinglePost) {
      return res.status(422).json({ error: "Post not found" });
    }
    console.log(deleteSinglePost.postedBy._id);
    console.log(req.user);
    // const deletePost = await Post.findByIdAndDelete(req.params.id);

    // res.json({ title: "deleted post", data: deletePost });
    if (deleteSinglePost.postedBy._id.toString() === req.user._id.toString()) {
      const deletePost = await Post.findByIdAndDelete(req.params.id);

      res.json({ title: "deleted post", data: deletePost });
    } else {
      res.status(401).send("unauthorized user");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "enter correct id" });
  }
};

module.exports = {
  createPost,
  allposts,
  getPost,
  updatePost,
  deletePost,
};
