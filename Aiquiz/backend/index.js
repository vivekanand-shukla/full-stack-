const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const quizRoutes = require("./routes/quizRoutes");

const app = express();
const corsOptions = {
  origin: [
    "https://full-stack-86o5.vercel.app", // frontend
    "http://localhost:5173" // local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.use("/api/quiz", quizRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

app.listen(5000, () => console.log("Server running"));