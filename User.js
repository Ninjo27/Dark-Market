const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coins: { type: Number, default: 0 },
  pendingCoins: { type: Number, default: 0 },
  role: { type: String, default: "user" }, // "admin" nếu là Ninjo27
});

module.exports = mongoose.model("User", UserSchema);
