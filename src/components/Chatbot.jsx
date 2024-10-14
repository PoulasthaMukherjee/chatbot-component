import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChat, sendMessage, endConversation, updateInputValue } from '../store/chatbotSlice';
import '../styles/Chatbot.css';

function Chatbot() {
  const dispatch = useDispatch();
  const { chatOpen, messages, userName, inputValue } = useSelector(state => state.chatbot);

  const handleSendMessage = () => {
    dispatch(sendMessage());
  };

  const handleInputChange = (e) => {
    dispatch(updateInputValue(e.target.value));
  };

  return (
    <div className="App">
      <button className="chat-button" onClick={() => dispatch(toggleChat())}>
        🗪
      </button>

      {chatOpen && (
        <div className="chatbox animated">
          <div className="chat-input">
            <b1>Netra Chat</b1>
            <button onClick={() => dispatch(endConversation())}>End Conversation</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={msg.id}>
                {index === 0 || messages[index - 1].date !== msg.date ? (
                  <div className="date-divider">{msg.date}</div>
                ) : null}

                <div className={msg.sender === 'bot' ? 'message bot' : 'message user'}>
                  {msg.sender === 'bot' && (
                    <img src="img.png" alt="Bot Avatar" className="avatar" />
                  )}
                  <p className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>{msg.text}</p>
                  <span className="time">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={userName ? 'Type your message...' : 'Enter your name...'}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;