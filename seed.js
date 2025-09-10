import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";
import Leaderboard from "./models/leaderboard.model.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pokemonDB";

const players = [
  "Dima", "Alex", "Arnaud", "Ahmed", "Marvin",
  "Renke", "Robin", "Sergii", "Stephan", "Thomas", "Yan"
];

const resetAutoIncrement = async () => {
  await mongoose.connection.collection("counters").updateOne(
    { id: "id" },
    { $set: { seq: 0 } },
    { upsert: true } 
  );
  console.log(chalk.magenta("AutoIncrement counter reset (id will start from 1)"));
};

const seedLeaderboard = async () => {
  try {
    await mongoose.connect(MONGO_URI, { dbName: "pokemonDB" });
    console.log(chalk.cyan("MongoDB connected"));

    await Leaderboard.deleteMany({});
    console.log(chalk.yellow("Old leaderboard entries deleted"));

    await resetAutoIncrement();

    for (const username of players) {
      const entry = await Leaderboard.create({
        username,
        score: Math.floor(Math.random() * 2000),
      });
      console.log(chalk.gray(`Player inserted: ${entry.username} (id=${entry.id})`));
    }

    console.log(chalk.green("All players successfully inserted into leaderboard"));
    process.exit(0);
  } catch (err) {
    console.error(chalk.red("Error while seeding:"), err);
    process.exit(1);
  }
};

seedLeaderboard();
