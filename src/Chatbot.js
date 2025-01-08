import React, { useState } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  // Handle input change
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // Send message to chatbot
  const handleSendMessage = async () => {
    if (userInput.trim() !== '') {
      // Add user message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userInput, sender: 'user' },
      ]);

      // Get response from backend (Kenny)
      const response = await fetchChatbotResponse(userInput);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, sender: 'kenny' },
      ]);

      // Clear input field
      setUserInput('');
    }
  };

  // Fetch response from backend
  const fetchChatbotResponse = async (userMessage) => {
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    return data.reply;
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        <div className="header">
          <span>Kenny - Your Assistant</span>
        </div>
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'kenny' ? 'kenny' : 'user'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
