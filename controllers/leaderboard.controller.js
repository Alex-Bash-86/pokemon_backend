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

const updateUserScore = async (req, res) => {
  try {
    const { username, score } = req.body;

    if (!username || typeof score !== "number") {
      return res.status(400).json({ msg: "Username and score required" });
    }

    // Spieler suchen
    let player = await Leaderboard.findOne({ username });

    if (player) {
      // Score addieren
      player.score += score;
      await player.save();
      return res.json({ msg: "Score updated", data: player });
    } else {
      // neuen Spieler anlegen
      const newPlayer = await Leaderboard.create({ username, score });
      return res.json({ msg: "New player created", data: newPlayer });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
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
  updateUserScore,
  updateScore,
  deleteScore,
};