const express = require("express");
const User = require("../models/User");
const Item = require("../models/Item");
const axios = require("axios");

const router = express.Router();

// Mua vật phẩm
router.post("/buy", async (req, res) => {
  const { username, itemId } = req.body;
  const user = await User.findOne({ username });
  const item = await Item.findById(itemId);

  if (!user || !item) return res.status(400).json({ message: "Người dùng hoặc vật phẩm không tồn tại" });
  if (user.coins < item.price) return res.status(400).json({ message: "Không đủ xu" });
  if (item.stock <= 0) return res.status(400).json({ message: "Hết hàng" });

  user.coins -= item.price;
  item.stock -= 1;
  await user.save();
  await item.save();

  // Gửi thông tin mua hàng lên Discord webhook
  const webhookUrl = "https://discord.com/api/webhooks/your-webhook-url";
  await axios.post(webhookUrl, {
    content: `Người dùng **${username}** đã mua **${item.name}** với giá **${item.price} xu**.`,
  });

  res.json({ message: `Mua thành công ${item.name}!` });
});

module.exports = router;
