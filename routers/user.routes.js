import { Router } from "express";
import { createUser, getAllUsers, getOneUser, updateOneUser, deleteUser } from "../controllers/user.controller.js";

import{ registerUser, login, logout, me } from "../controllers/auth.controllers.js";
import { authenticate } from '../middlewares/index.js';


const userRouter = Router();

userRouter.post("/", registerUser);
userRouter.post("/login", login);
userRouter.delete("/logout", logout);
userRouter.get('/me', authenticate, me);

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getOneUser);
userRouter.put("/:id", authenticate, updateOneUser);
userRouter.delete("/:id", authenticate, deleteUser);

export default userRouter;