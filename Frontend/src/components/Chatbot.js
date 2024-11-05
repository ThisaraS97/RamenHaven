import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = ({ onMessage }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatHistory([...chatHistory, { sender: 'admin', message: userMessage }]);

    try {
      const response = await axios.post('http://localhost:5000/chatbot', { message: userMessage });
      const botReply = response.data.reply;

      setChatHistory([...chatHistory, { sender: 'admin', message: userMessage }, { sender: 'bot', message: botReply }]);
    } catch (error) {
      console.error('Error interacting with the chatbot:', error);
      setChatHistory([...chatHistory, { sender: 'bot', message: "Sorry, I couldn't understand." }]);
    }

    setChatInput(''); // Reset input field
  };

  return (
    <div className="chatbot-container">
      <div className="chat-history">
        {chatHistory.map((entry, index) => (
          <div key={index} className={`chat-message ${entry.sender}`}>
            <span>{entry.message}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
