const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
const authRoutes = require("./routes/auth");
const coinRoutes = require("./routes/coins");
const shopRoutes = require("./routes/shop");

app.use("/api/auth", authRoutes);
app.use("/api/coins", coinRoutes);
app.use("/api/shop", shopRoutes);
