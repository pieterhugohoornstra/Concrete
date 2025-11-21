const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_KEY) {
  console.warn('Warning: OPENAI_API_KEY is not set. The proxy will not work until you set it in the environment.');
}

app.post('/api/chat', async (req, res) => {
  const { messages, model } = req.body || {};
  if (!messages) return res.status(400).json({ error: 'missing messages in request body' });

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({ model: model || 'gpt-4.1-mini', messages })
    });

    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (err) {
    console.error('proxy error', err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
