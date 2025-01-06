import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion, AnimatePresence } from 'framer-motion';
import './chat.css';

function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null); // Store chat instance here
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const chatButtonRef = useRef(null);

  // Initialize the chat model once when the component mounts
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI('YOUR_API_KEY');
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const chatInstance = await model.startChat({
          history: [
            {
              role: 'user',
              parts: [{ text: 'you are a database expert designer and developing in SQL for SQLite and PostgreSQL' }],
            },
            {
              role: 'model',
              parts: [{ text: '' }],
            },
          ],
        });
        setChat(chatInstance);
      } catch (err) {
        setError('Failed to initialize chat: ' + err.message);
      }
    };

    initializeChat();
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleMouseDown = (e) => {
    const chatButton = chatButtonRef.current;
    const offsetX = e.clientX - chatButton.getBoundingClientRect().left;
    const offsetY = e.clientY - chatButton.getBoundingClientRect().top;

    const handleMouseMove = (moveEvent) => {
      setPosition({
        x: moveEvent.clientX - offsetX,
        y: moveEvent.clientY - offsetY,
      });
      
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const chatStyle = {
    top: `${position.y + 50}px`, // Positioning the chat slightly below the button
    left: `${position.x + 70}px`,
    position: 'fixed',
  };

  const buttonhandler = async () => {
    if (userInput.trim() && chat) {
      const newMessage = { text: userInput, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setLoading(true);
      setError(null);

      try {
        const result = await chat.sendMessage(userInput);
        const botResponse = { text: result.response.text(), sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (err) {
        setError('An error occurred: ' + err.message);
      } finally {
        setLoading(false);
      }

      setUserInput('');
    }
  };

  const inputhandler = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <>
      <div
        className="chat-button"
        ref={chatButtonRef}
        onMouseDown={handleMouseDown}
        onClick={toggleChat}
        style={{ top: `${position.y}px`, left: `${position.x}px`, position: 'fixed' }}
      >
        ✨
      </div>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="chat-window"
            style={chatStyle}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="askme">Ask Me!!</h3>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              {loading && <p className='ellipsis'></p>}
            </div>
            <input
              type="text"
              onChange={inputhandler}
              value={userInput}
              placeholder="Type your message..."
              className="my-input"
            />
            <button type="button" onClick={buttonhandler}>Send</button>
            {error && <p className="error">{error}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chat;
