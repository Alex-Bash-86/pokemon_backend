import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false, //don't show the password in the response
    trim: true
  },
  score: {
    type: Number,
    default: 0
    //required: true
  },
  role: {
    type: String,
    enum: ["player", "admin", "superadmin"],
    default: "player"
  }
});
const User = mongoose.model("User", userSchema);

export default User;
