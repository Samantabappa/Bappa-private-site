require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// Schema
const logSchema = new mongoose.Schema({
  event: String,
  page: String,
  sessionId: String,
  timestamp: { type: Date, default: Date.now }
});

const Log = mongoose.model("Log", logSchema);

// API endpoint
app.post("/log", async (req, res) => {
  const log = new Log(req.body);
  await log.save();
  res.json({ status: "saved" });
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
