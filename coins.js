const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Nhận xu từ quảng cáo
router.post("/earn", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Người dùng không tồn tại" });

  user.pendingCoins += 1; // Xu vào hàng chờ duyệt
  await user.save();
  res.json({ message: "Bạn đã nhận 1 xu, chờ duyệt!" });
});

// Duyệt xu (chỉ admin)
router.post("/approve", async (req, res) => {
  const { username, percentage } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Người dùng không tồn tại" });

  const approvedCoins = Math.round(user.pendingCoins * (percentage / 100));
  user.coins += approvedCoins;
  user.pendingCoins -= approvedCoins;
  await user.save();

  res.json({ message: `Duyệt ${approvedCoins} xu cho ${username}` });
});

module.exports = router;
