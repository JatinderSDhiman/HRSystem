const dotenv = require("dotenv");
const User = require("../models/user");
require("../database/connection");

dotenv.config({ path: "./config.env" });

exports.add = async (req, res) => {
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
    const userFound = await User.findOne({ email: email });

    if (userFound) {
      return res.status(422).json({ error: "User already exists." });
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User account created." });
  } catch (error) {
    console.log(err);
  }
};
exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      user,
      success: true,
      message: "User found.",
    });
  } catch (error) {
    res.send(error);
  }
};
exports.listEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "Employee" });

    if (employees === null) {
      return res
        .status(202)
        .json({ message: "No employees exist in the record." });
    }

    res
      .status(200)
      .json({ message: `${employees.length} Employees found`, employees });
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};
exports.list = async (req, res) => {
  try {
    const users = await User.find({});

    if (users === null) {
      return res.status(202).json({ message: "No users exist in the record." });
    }
    res.status(200).json({ message: `${users.length} Employees found`, users });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.update = async function (req, res) {
  let id = req.params.id;

  let user = new User({ _id: id, ...req.body });

  try {
    const oldUser = await User.findByIdAndUpdate(id, user, { rawResult: true });

    res.status(200).json({ user, message: "User updated." });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.delete = async function (request, response) {
  try {
    await User.findByIdAndDelete(request.params.id);
    response.status(200).json({
      success: true,
      msg: "User Deleted Successfully",
    });
  } catch (error) {
    response.status(500).send(error);
  }
};
