import React, { useState } from 'react';
import axios from 'axios';
import './FloatingChatbot.css';  // Add styles for the chatbot UI

const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    // Toggle the chatbot window
    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (userInput.trim() === '') return;

        const newMessage = { sender: 'user', message: userInput };
        setChatHistory([...chatHistory, newMessage]);

        try {
            const response = await axios.post('http://localhost:5000/chatbot', {
                message: userInput
            });

            const botReply = { sender: 'bot', message: response.data.response };
            setChatHistory([...chatHistory, newMessage, botReply]);

        } catch (error) {
            console.error('Error fetching chatbot response:', error);
        }

        setUserInput('');  // Reset the input field
    };

    return (
        <>
            <div className="floating-chatbot-button" onClick={toggleChatbot}>
                {isOpen ? 'Close Chat' : 'Open Chat'}
            </div>

            {isOpen && (
                <div className="floating-chatbot-popup">
                    <div className="chatbot-header">
                        <h4>Chat Assistant</h4>
                        <button onClick={toggleChatbot}>X</button>
                    </div>
                    <div className="chat-history">
                        {chatHistory.map((chat, index) => (
                            <div key={index} className={`chat-message ${chat.sender}`}>
                                <span>{chat.message}</span>
                            </div>
                        ))}
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingChatbot;
