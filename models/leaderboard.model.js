import mongoose, { Schema, model } from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const leaderboardSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const AutoIncrement = AutoIncrementFactory(mongoose);
leaderboardSchema.plugin(AutoIncrement, { inc_field: "id" });

const Leaderboard = model("Leaderboard", leaderboardSchema);

export default Leaderboard;
