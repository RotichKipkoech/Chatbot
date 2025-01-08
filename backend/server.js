const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Simulate chatbot response (Kenny)
app.post('/chat', (req, res) => {
  const userMessage = req.body.message;

  // Process user input and respond (using a simple response here)
  const response = `Kenny's reply to: "${userMessage}"`;

  res.json({ reply: response });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
