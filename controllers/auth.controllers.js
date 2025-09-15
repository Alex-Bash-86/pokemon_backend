import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import chalk from "chalk";

const secure = process.env.NODE_ENV === "production" ? true : false;

//********** POST  /users *************
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  const existingUser = await User.exists({ username });
  if (existingUser) {
    throw new Error("Username already taken", { cause: 409 });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(13);
  const hashedPW = await bcrypt.hash(password, salt);

  // Save user
  const user = (
    await User.create({ ...req.body, password: hashedPW })
  ).toObject();
  delete user.password;

  const token = jwt.sign(
    { _id: user._id, role: user.role, score: user.score },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN_DAYS + "d"
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    //httpOnly: false,
    secure,
    sameSite: "lax",
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000
    )
  });

  res.json({ message: "User registered successfully", data: user });
};

//********** POST /users/login **********
const login = async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Find the user by username and include the password field
  const user = await User.findOne({ username })
    .select("+password")
    .lean();
  if (!user) throw new Error("Invalid credentials", { cause: 401 });

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials", { cause: 401 });

  // Remove the password field from the user object before sending the response
  delete user.password;

  const token = jwt.sign(
    { _id: user._id, role: user.role, score: user.score },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN_DAYS + "d"
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    //httpOnly: false,
    secure,
    sameSite: "lax",
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000
    )
  });

  res.json({ message: "Login successful", data: user });
};

//********** DELETE  /users/logout *************
const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure,
    sameSite: "lax"
  });

  res.json({ message: "Logout successful" });
};

//********** GET  /users/auth/me *************
const getMe = async (req, res) => {
  // I have now access to the payload of the token because of the verifyToken middleware
  const { _id } = req.user;

  // Log _id to see its value

  console.log(chalk.bgRed("auth user id"), _id);
  const user = await User.findById(_id);

  console.log(chalk.bgRed("user found"), user);

  if (!user) throw new Error("Not Authenticated", { cause: 401 });

  res.json({ data: user });
};

export { registerUser, login, logout, getMe };
