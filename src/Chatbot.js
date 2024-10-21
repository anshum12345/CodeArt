// src/Chatbot.js
import React, { useState } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            const userMessage = { text: input, sender: 'user' };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInput('');

            // Get bot response
            const botResponse = await getBotResponse(input);
            setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
        }
    };

    const getBotResponse = async (message) => {
        const response = {
            text: "I'm processing your request...",
            sender: 'bot',
        };

        // Call your AI API here
        try {
            const res = await fetch('https://api.your-ai-service.com/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer YOUR_API_KEY`, // Replace with your actual API key
                },
                body: JSON.stringify({ prompt: message }),
            });
            const data = await res.json();
            response.text = data.answer || "I'm not sure how to respond to that.";
        } catch (error) {
            console.error('Error fetching AI response:', error);
            response.text = "Sorry, I'm having trouble reaching the server.";
        }

        return response;
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={styles.chatbotContainer}>
            <div style={styles.circleButton} onClick={toggleChat}>
                <span style={styles.chatIcon}>💬</span>
            </div>
            {isOpen && (
                <div style={styles.chatContainer}>
                    <div style={styles.messages}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{ ...styles.message, ...(msg.sender === 'user' ? styles.userMessage : styles.botMessage) }}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} style={styles.chatbotForm}>
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type a message..."
                            style={styles.chatbotInput}
                        />
                        <button type="submit" style={styles.chatbotButton}>Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

const styles = {
    chatbotContainer: {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
    },
    circleButton: {
        width: '60px',
        height: '60px',
        backgroundColor: '#007bff',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease',
        animation: 'pulse 1.5s infinite',
    },
    chatIcon: {
        fontSize: '24px',
        color: 'white',
    },
    chatContainer: {
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        marginTop: '10px',
        width: '300px',
        maxWidth: '80vw',
    },
    messages: {
        maxHeight: '300px',
        overflowY: 'auto',
        padding: '10px',
        flexGrow: 1,
    },
    message: {
        margin: '5px 0',
        padding: '8px',
        borderRadius: '5px',
        maxWidth: '80%',
        wordWrap: 'break-word',
    },
    userMessage: {
        backgroundColor: '#e1f5fe',
        alignSelf: 'flex-end',
        textAlign: 'right',
    },
    botMessage: {
        backgroundColor: '#c8e6c9',
        alignSelf: 'flex-start',
        textAlign: 'left',
    },
    chatbotForm: {
        display: 'flex',
        padding: '5px',
        borderTop: '1px solid #ccc',
    },
    chatbotInput: {
        flex: 1,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginRight: '5px',
    },
    chatbotButton: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

// Add keyframes for the animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
}`, styleSheet.cssRules.length);

export default Chatbot;
