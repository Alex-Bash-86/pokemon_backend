import Leaderboard from "../models/leaderboard.model.js";

const getLeaderboard = async (_req, res) => {
  const entries = await Leaderboard.find().sort({ score: -1 }).lean();
  res.json({ data: entries });
};

const createScore = async (req, res) => {
  const { username, score } = req.body;
  if (!username || score == null) throw new Error("username und score sind erforderlich");

  const newEntry = await Leaderboard.create({ username, score });
  res.status(201).json({ data: newEntry });
};

const getOneScore = async (req, res) => {
  const { id } = req.params;
  const entry = await Leaderboard.findById(id).lean();
  if (!entry) throw new Error("Eintrag nicht gefunden");
  res.json({ data: entry });
};

const updateScore = async (req, res) => {
  const { id } = req.params;
  const updatedEntry = await Leaderboard.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!updatedEntry) throw new Error("Eintrag nicht gefunden");
  res.json({ data: updatedEntry });
};

const deleteScore = async (req, res) => {
  const { id } = req.params;
  const deletedEntry = await Leaderboard.findByIdAndDelete(id).lean();
  if (!deletedEntry) throw new Error("Eintrag nicht gefunden");
  res.json({ data: deletedEntry, message: "Eintrag erfolgreich gelöscht" });
};

export {
  getLeaderboard,
  getOneScore,
  createScore,
  updateScore,
  deleteScore,
};