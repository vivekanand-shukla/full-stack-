const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  topic: String,
  questions: Array,
  score: Number
});

module.exports = mongoose.model("Quiz", quizSchema);