const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");
require("../database/connection");

dotenv.config({ path: "./config.env" });

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, address, city, phone } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !address ||
    !city ||
    !phone
  ) {
    return res.status(422).json({ error: "Missing information" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res
        .status(422)
        .json({ error: "This email is  already registered." });
    }
    const user = new User(req.body);

    const registeredUser = await user.save();
    res
      .status(201)
      .json({ message: "Student account created.", registeredUser });
  } catch (err) {
    console.log(err);
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide both email and password" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const passwordMatch = await bcrypt.compareSync(
        password,
        userLogin.password
      );

      if (!passwordMatch) {
        res.status(400).json({ error: "Invalid Credentials." });
      } else {
        const token = jwt.sign({ id: userLogin._id }, process.env.SECRET_KEY);

        res.setHeader("Set-Cookie", `token=${token}; HttpOnly`);
        return res.status(200).json({
          message: `Sign In successfull for ${userLogin.firstName} ${userLogin.lastName}`,
        });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials." });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.logOut = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};
