const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  stock: Number,
  imageUrl: String,
});

module.exports = mongoose.model("Item", ItemSchema);
