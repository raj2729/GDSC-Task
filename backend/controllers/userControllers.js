const asyncHandler = require("express-async-handler");
const generateToken = require("../middlewares/generateToken");
const User = require("../models/userModel");

/*
LIST OF CONTROLLERS
1. Register Student
2. Login Student
3. Get user Details - user protected
4. Update User - user protected
5. Get all details of user - admin protected
*/

// Register New Student
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, division, sapid, year } = req.body;

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
      division,
      year,
      sapid,
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

// User can see his/her details - Protected Route
const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({
      success: true,
      data: user,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

// User updates his/her own details - Protected Route
const updateUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (req.body.name !== user.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.division !== user.division) {
      user.division = req.body.division;
    }
    if (req.body.year !== user.year) {
      user.year = req.body.year;
    }
    if (req.body.sapid !== user.sapid) {
      user.sapid = req.body.sapid;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } else {
    res.status(404).json({
      success: false,
      data: "Details could not be updated",
    });
  }
});

// Get all users
const getAllUserDetails = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: false });
  if (users) {
    res.status(200).json({
      success: true,
      data: users,
    });
  } else {
    res.status(404).json({
      success: false,
      data: "Details could not be found",
    });
  }
});

module.exports = {
  registerUser,
  userLogin,
  getUserDetails,
  updateUserDetails,
  getAllUserDetails,
};
