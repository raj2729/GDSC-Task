const express = require("express");

const { registerUser, userLogin } = require("../controllers/userControllers");

const { protect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Register new user
router.route("/userRegister").post(registerUser);

// Post user auth
router.route("/userLogin").post(userLogin);

module.exports = router;
