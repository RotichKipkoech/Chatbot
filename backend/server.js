// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');

const app = express();
const port = process.env.PORT || 5000; // Use Render's provided port

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Store the conversation state (in-memory, not for production use)
let conversations = {};

// POST endpoint for chat messages
app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  const sessionId = req.body.sessionId || uuid.v4();  // Generate new session if not provided

  // Create a new conversation state if not already exists
  if (!conversations[sessionId]) {
    conversations[sessionId] = {
      step: 1,  // Keep track of the conversation step
    };
  }

  const conversation = conversations[sessionId];
  let reply = '';

  // Check the current conversation step and decide the response
  switch (conversation.step) {
    case 1:
      reply = `Nice to meet you, ${userMessage}! How old are you?`;
      conversation.step = 2;
      break;
    case 2:
      reply = `Wow, ${userMessage} years old! What is your favorite hobby?`;
      conversation.step = 3;
      break;
    case 3:
      reply = `That sounds like a lot of fun! Where do you live?`;
      conversation.step = 4;
      break;
    case 4:
      reply = `${userMessage} is a nice place! Thanks for sharing! It was nice talking to you!`;
      conversation.step = 1;  // Reset the conversation flow
      break;
    default:
      reply = "I'm not sure how to respond. Can you say that again?";
  }

  // Store the user's answer for personalized responses
  if (conversation.step === 2) {
    conversation.name = userMessage;  // Save the user's name
  }

  res.json({ reply, sessionId }); // Send response with updated session ID
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
