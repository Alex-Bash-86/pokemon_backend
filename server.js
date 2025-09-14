import express from "express";
import cookieParser from "cookie-parser";
import chalk from "chalk";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import authRouter from "./routers/user.routes.js";
import userRouter from "./routers/user.routes.js";

//import "./db/index.js";
import connectDB from "./db/index.js";
import leaderboardRoutes from "./routers/leaderboard.routes.js";
import { errorHandler } from "./middlewares/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL  || "http://localhost:5173",
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.send("Willkommen bei der Pokemon Battle!");
});

// set up a route specific middleware to handle all requests to all path starting with /auth
app.use("/auth", authRouter);

app.get("/health", async (_req, res) => {
  const { ok } = await mongoose.connection.db.admin().ping();
  if (!ok) throw new Error("DB is unconnected", { cause: 503 });
  res.json({ msg: "Running" });
});

app.use("/leaderboard", leaderboardRoutes);
app.use('/users', userRouter);
//app.use('/login', userRouter);

// Handle 404 for all other routes  
//app.use("/{*splat}", (req, _res) => {
//  throw new Error(`URL unavailable; you used ${req.originalUrl}`, {
//    cause: 404
//  });
//});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(chalk.bgGreen(`Server listening on port ${port}`));
    });
  } catch (err) {
    console.log(chalk.bgRed("Failed to start server:"), err);
    process.exit(1);
  }
};

startServer();
