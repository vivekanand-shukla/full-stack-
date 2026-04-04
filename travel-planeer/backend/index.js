import 'dotenv/config';
import axios from 'axios';
import express from 'express';
const app = express();
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'nvidia/nemotron-3-nano-30b-a3b:free';
const API_KEY = process.env.API_KEY;
import cors from 'cors';
app.use(cors({
  origin: "*"
}));

const SYSTEM_PROMPT = `
You are an AI assistant acting as a helpful travel agent.
Respond with JSON only. No prose, markdown, or backticks.

Use exactly this schema and field names:

{
  "destination": "string - city, country",
  "best_time": "string - month(s)/season with one sentence why",
  "duration_days": number,
  "top_attractions": ["string", "string", "string"],
  "sample_itinerary": [
    {"day": 1, "plan": "string"},
    {"day": 2, "plan": "string"},
    {"day": 3, "plan": "string"}
  ],
  "estimated_budget_eur": { "low": number, "mid": number, "high": number },
  "local_tips": ["string", "string"]
}

Rules:
- Output valid JSON only, nothing else.
- Keep numbers unquoted.
- If unsure, use null or [] but keep the schema.
`;
if (!API_KEY) {
  console.error('Please set OPENROUTER_API_KEY in your .env');
  process.exit(1);
}




async function main(prompt) {
  const res = await axios.post(
    API_URL,
    {
      model: MODEL,
      messages: [ { role: 'system', content: SYSTEM_PROMPT } ,{ role: 'user', content: prompt } ,]
    
    },
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

//   console.log("Raw response:", JSON.stringify(res.data, null, 2));
// console.log(res.data.choices[0].message.content);
  // Optional: print only message content
  return  res?.data?.choices?.[0]?.message?.content || '';
}


app.get('/plan', async (req, res) => {
  try {
    const place = req.query.place;

    if (!place) {
      return res.status(400).json({ error: 'place query param required' });
    }

    const PROMPT = `Give a travel plan for first time visiting ${place}`;

    const raw = await main(PROMPT);

    console.log(raw);

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return res.json({ raw });
    }

    res.json(parsed);

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});