import { Router } from 'express';
import { getLeaderboard, getOneScore, createScore, updateScore, deleteScore } from "../controllers/leaderboard.controller.js";

const leaderboardRouter = Router();

leaderboardRouter.get("/", getLeaderboard);
leaderboardRouter.get("/:id", getOneScore);
leaderboardRouter.post("/", createScore);
leaderboardRouter.put("/:id", updateScore);
leaderboardRouter.delete("/:id", deleteScore);

export default leaderboardRouter;
