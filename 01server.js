const express = require('express');
const fetch = require('node-fetch'); // Or 'axios' if you prefer
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key is missing. Set the DEEPSEEK_API_KEY environment variable in a .env file." });
  }

  try {
    const response = await fetch('https://api.deepseek.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-r1',
        prompt: prompt,
      }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("DeepSeek API Error:", response.status, errorData);
        return res.status(response.status).json({ error: "Error calling DeepSeek API" });
      }

    const data = await response.json();
    res.json({ result: data.choices[0].text });
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    res.status(500).json({ error: 'Error generating text' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));