import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { register, login, getMe } from "../controllers/user.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
//! Will be used frontend side to check if the user is logged in or not
authRouter.get("/me", authenticate, getMe);

export default authRouter;
