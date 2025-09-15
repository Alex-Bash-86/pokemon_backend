import { Router } from "express";
import {
  getLeaderboard,
  getOneScore,
  createScore,
  updateScore,
  deleteScore
} from "../controllers/leaderboard.controller.js";
import { authenticate } from "../middlewares/index.js";
import { hasRole } from "../middlewares/index.js";

const leaderboardRouter = Router();

leaderboardRouter.get("/", getLeaderboard);
leaderboardRouter.get("/:id", authenticate, getOneScore);
leaderboardRouter.post(
  "/",
  authenticate,
  hasRole("self", "admin"),
  createScore
);
leaderboardRouter.put("/:id", authenticate, hasRole("admin"), updateScore);
leaderboardRouter.delete("/:id", authenticate, hasRole("admin"), deleteScore);

export default leaderboardRouter;
