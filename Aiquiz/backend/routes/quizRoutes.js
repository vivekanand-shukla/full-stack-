const express = require("express");
const router = express.Router();
const axios = require("axios");
const Quiz = require("../models/Quiz");

router.post("/generate", async (req, res) => {
  const { topic  } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
      model:   "qwen/qwen3-next-80b-a3b-instruct:free",
        messages: [
           
          {
    role: "user",
    content: `
Generate 5 MCQs on ${topic}.
Return ONLY JSON in this format:
[{"question": "string",
    "options": ["A","B","C","D"],
    "answer": "correct option" }]
`
  }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = JSON.parse(
      response.data.choices[0].message.content
    );

    res.json(data);

  }catch (err) {
  console.error("ERROR FULL:", err.response?.data || err.message);

  res.status(500).json({
    error: "AI failed",
    details: err.response?.data || err.message
  });
}
});



module.exports = router;