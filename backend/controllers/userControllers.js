const asyncHandler = require("express-async-handler");
const generateToken = require("../middlewares/generateToken");
const User = require("../models/userModel");

/*
LIST OF CONTROLLERS
1. Register Student
2. Login Student
*/

// Register New Student
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const studentExist = await User.findOne({ email });
  if (studentExist) {
    res.status(400).json({
      success: false,
      data: "Student already exists",
    });
  } else {
    const student = await User.create({
      name,
      email,
      password,
    });

    if (student) {
      res.status(201).json({
        success: true,
        data: student,
      });
    } else {
      res.status(400).json({
        success: false,
        data: "Invalid email or password",
      });
    }
  }
});

// Login existing users
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      success: true,
      data: user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      success: false,
      data: "Invalid email or password",
    });
  }
});

module.exports = { registerUser, userLogin };
