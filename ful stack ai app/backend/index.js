const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const quizRoutes = require("./routes/quizRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/quiz", quizRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

app.listen(5000, () => console.log("Server running"));