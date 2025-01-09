import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components for UI
const ChatWrapper = styled.div`
  width: 350px;
  height: 500px;
  background-color: #2d2d2d;
  color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 400px) {
    width: 100%;
    height: 90%;
  }
`;


const ChatHeader = styled.div`
  background-color: #1a1a1a;
  padding: 15px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #ffa500;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ChatMessage = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: ${(props) => (props.sender === 'User' ? 'row-reverse' : 'row')};
  align-items: center;
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.sender === 'User' ? '#ffa500' : '#333')};
  color: ${(props) => (props.sender === 'User' ? '#fff' : '#f1f1f1')};
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 70%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
`;

const ChatInputWrapper = styled.div`
  padding: 10px;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  border-top: 2px solid #333;
`;

const TextInput = styled.input`
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 20px;
  background-color: #333;
  color: white;
  font-size: 16px;
  margin-right: 10px;
  &:focus {
    outline: none;
    border: 2px solid #ffa500;
  }
`;

const SendButton = styled.button`
  padding: 10px 15px;
  background-color: #ffa500;
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #ff7a00;
  }
  &:focus {
    outline: none;
  }
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'Kenny', text: 'Hello! What is your name?' },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [sessionId, setSessionId] = useState('');

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    // Add user's message to the chat
    setMessages([...messages, { sender: 'User', text: userMessage }]);
    
    // Send message to the backend and get a response
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, sessionId: sessionId }),
    });

    const data = await response.json();

    // Display the response from Kenny
    setMessages([...messages, { sender: 'User', text: userMessage }, { sender: 'Kenny', text: data.reply }]);

    // Update the sessionId for next user input
    setSessionId(data.sessionId);

    // Clear the input field
    setUserMessage('');
  };

  return (
    <ChatWrapper>
      <ChatHeader>Kenny Chatbot</ChatHeader>
      <ChatBody>
        {messages.map((message, index) => (
          <ChatMessage key={index} sender={message.sender}>
            <MessageBubble sender={message.sender}>{message.text}</MessageBubble>
          </ChatMessage>
        ))}
      </ChatBody>

      <ChatInputWrapper>
        <TextInput
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your answer here"
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </ChatInputWrapper>
    </ChatWrapper>
  );
};

export default Chatbot;
