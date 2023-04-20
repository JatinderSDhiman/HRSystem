const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userNumber: {
    type: Number,
    unique: true,
    default: function () {
      return crypto.randomInt(10000, 99999);
    },
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["Employee", "HR", "Admin"],
    default: "Employee",
  },
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
