import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import mongoose from 'mongoose';

import "./db/index.js"; 
import leaderboardRoutes from "./routers/leaderboard.routes.js";
import { errorHandler } from "./middlewares/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/health', async (_req, res) => {
  const { ok } = await mongoose.connection.db.admin().ping();
  if (!ok) throw new Error('DB is unconnected', { cause: 503 });
  res.json({ msg: 'Running' });
});

app.use("/leaderboard", leaderboardRoutes);

app.use('/{*splat}', (req, _res) => {
  throw new Error(`URL unavailable; you used ${req.originalUrl}`, { cause: 404 });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(chalk.bgGreen(` Personal Library API listening on port ${port} `));
});
