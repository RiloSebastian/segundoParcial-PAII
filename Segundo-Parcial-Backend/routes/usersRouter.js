const { SECRET } = require("../utils/config");
const express = require("express");
const usersRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const correctPass =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    if (!(user && correctPass)) {
      return next({ ok: false, message: "Usuario o clave invalido" });
    }
    const userToken = {
      username: user.username,
      id: user._id,
    };
    const token = await jwt.sign(userToken, SECRET);
    res
      .status(200)
      .json({
        token,
      })
      .end();
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/registro", (req, res, next) => {
  const { username, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const passwordHash = hash;
      const newUser = new User({
        username,
        passwordHash,
      });
      return newUser.save();
    })
    .then((userSaved) => {
      console.log(userSaved);
      res.status(200).json(userSaved).end();
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = usersRouter;
