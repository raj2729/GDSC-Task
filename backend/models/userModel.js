const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      enum: ["A", "B", "C", "Z"],
      // required: true,
      default: "Z",
    },
    sapid: {
      type: Number,
      required: true,
      default: 0,
    },
    year: {
      type: String,
      enum: ["FE", "SE", "TE", "BE", "UG"],
      // required: true,
      default: "UG",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enterredPassword) {
  return await bcrypt.compare(enterredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(5);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
