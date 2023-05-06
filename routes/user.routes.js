const express = require("express");
const userRoute = express.Router();
const { UserModel } = require("../modal/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


userRoute.post("/register", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    bcrypt.hash(password, 6, async (err, hash) => {
      const data = await UserModel.findOne({ email: email });

      if (data) {
        res.status(201).send({ msg: "user already exists" });
      } else {
        const user = new UserModel({
          name,
          email,
          password: hash,
          isAdmin,
        });

        await user.save();
        res.status(201).send({ msg: "user Register done" });
      }
    });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await UserModel.findOne({ email: email });

    if (data) {
      bcrypt.compare(password, data.password, (err, result) => {
        if (result) {
          res
            .status(201)
            .send({
              msg: "login done",
              token: jwt.sign({"_id": data._id }, "secretkey"),
            });
        } else {
          res.status(404).send({ msg: "login fail" });
        }
      });
    } else {
      res.status(404).send({ msg: "login fail wrong data" });
    }
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

module.exports = {
  userRoute,
};
