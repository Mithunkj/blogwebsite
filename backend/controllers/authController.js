const express = require("express");
const User = require("../model/userModel");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const refresh = process.env.Jwt_swcret;

register = async (req, res) => {
  try {
    if (
      !req.body.userName ||
      !req.body.email ||
      !req.body.mobileNumber ||
      !req.body.password
    ) {
      return res.status(400).send({ error: "fill all fields" });
    }

    const existUser = await User.find({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });
    console.log(existUser);

    if (existUser.length > 0) {
      return res.status(400).json({ error: "user already present" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 12);
    console.log("test 2");

    const creatUserName = (data) => {
      let val = Math.floor(1000 + Math.random() * 9000);
      let userName = data;

      let randomNum = Math.floor(Math.random() * 4) + 1;
      let firstSlice = userName.slice(0, randomNum);
      let secondSlice = userName.slice(randomNum, 5);
      function makeid(length) {
        let result = "";
        const characters = "._";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
          counter += 1;
        }
        return result;
      }
      newName = firstSlice + makeid(1) + secondSlice + val;
      return newName;
    };

    const newUser = await User.create({
      user: req.body.user,
      userName: creatUserName(req.body.userName),
      password: hashPassword,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
    });
    console.log(newUser);
    res.status(201).json({
      title: "new user has been created",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

login = async (req, res) => {
  console.log(req.body);

  try {
    if (!req.body.email || !req.body.password) {
      return res.status(404).send({ error: "user not found" });
    }
    console.log("test 2");
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, refresh);
      const { _id, userName, email } = user;
      res.json({
        user: { _id, userName, email },
        // userId: user._id,
        token: token,
      });
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
};
