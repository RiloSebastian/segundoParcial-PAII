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
    res.status(200).json({
      token
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/registro", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      passwordHash,
    });
    const userSaved = await newUser.save();
    res.status(201).json(userSaved);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
