import User from "../models/user.model.js";
import Leaderboard from "../models/leaderboard.model.js";
import bcrypt from "bcrypt";

//********** POST auth/register **********
const register = async (req, res) => {};
//********** POST auth/login **********
const login = async (req, res) => {};

//********** GET auth/me **********
// !import: getMe is used frontend side to check if the user is logged in or not
const getMe = async (req, res) => {};
export { register, login, getMe };
