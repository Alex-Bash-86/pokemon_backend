import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteUser
} from "../controllers/user.controller.js";


import {
  registerUser,
  login,
  logout,
  getMe
} from "../controllers/auth.controllers.js";
import { authenticate } from "../middlewares/index.js";


const userRouter = Router();

userRouter.post("/", registerUser);
userRouter.post("/login", login);
userRouter.delete("/logout", logout);


userRouter.get("/", getAllUsers);
userRouter.get("/:id", getOneUser);
userRouter.put("/:id", authenticate, updateOneUser);
userRouter.delete("/:id", authenticate, deleteUser);

// verifies token client side using the authenticate middleware  and retrieve the user information by using  the token id in the payload
userRouter.get("/auth/me", authenticate, getMe);
export default userRouter;
