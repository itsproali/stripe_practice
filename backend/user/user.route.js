const express = require("express");
const User = require("./user.model");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if email and password is provided
    if (!email || !password) {
      return next(new Error("Please provide email and password"));
    }
    // Check if user exist and password is correct
    const user = await User.findOne({ email });
    if (!user) {
      return next(new Error("Invalid credentials"));
    }
    const isMatch = user.password === password;
    if (!isMatch) {
      return next(new Error("Invalid credentials"));
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
