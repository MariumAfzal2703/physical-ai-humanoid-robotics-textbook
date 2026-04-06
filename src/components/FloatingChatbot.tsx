import React, { useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm the AI assistant for this Physical AI & Humanoid Robotics textbook 👋", sender: 'bot' },
    { id: 2, text: "📖 Made with ❤️ by Marium Afzal — AI Engineer & Aspiring Robotics Engineer at PIAIC", sender: 'bot' },
    { id: 3, text: "Ask me anything about ROS 2, Gazebo, NVIDIA Isaac, or VLA! 🚀", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user' as const
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Please login to use the full AI chatbot. Once logged in, I can search all 14 chapters to answer your question! 🚀",
        sender: 'bot' as const
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f72585, #7b2d8b)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          cursor: 'pointer',
          zIndex: 600,
          boxShadow: '0 0 20px rgba(247,37,133,.5)',
          animation: 'chatPulse 2s infinite',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        💬
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '24px',
            width: '320px',
            borderRadius: '18px',
            background: 'var(--chat-bg)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 20px 60px rgba(0,0,0,.5)',
            zIndex: 600,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(12%, rgba(247,37,133,0.12), rgba(168,85,247,0.12))',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTopLeftRadius: '18px',
              borderTopRightRadius: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f72585, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                🤖
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)' }}>
                  PhysAI Assistant
                </div>
                <div
                  style={{
                    fontSize: '0.68rem',
                    color: '#22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#22c55e',
                    }}
                  ></div>
                  Online · Ready to help
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text)',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              maxHeight: '320px',
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: message.sender === 'user'
                    ? '18px 18px 4px 18px'
                    : '18px 18px 18px 4px',
                  background: message.sender === 'user'
                    ? 'linear-gradient(135deg, #f72585, #7b2d8b)'
                    : 'rgba(247,37,133,.08)',
                  border: message.sender === 'user'
                    ? 'none'
                    : '1px solid rgba(247,37,133,.15)',
                  color: message.sender === 'user' ? 'white' : 'var(--text)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  lineHeight: '1.4',
                }}
              >
                {message.text}

                {/* Special message for LinkedIn card */}
                {message.id === 2 && (
                  <div
                    style={{
                      marginTop: '8px',
                      padding: '10px',
                      background: 'rgba(0,119,181,.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,119,181,.2)',
                    }}
                  >
                    <div
                      className="connect-label"
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        fontSize: '0.7rem',
                        color: 'var(--muted)',
                        marginBottom: '6px',
                      }}
                    >
                      // Connect with the author
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            color: '#60a5fa',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            marginBottom: '2px',
                          }}
                        >
                          💼 Marium Afzal
                        </div>
                        <div
                          style={{
                            color: 'var(--muted)',
                            fontSize: '0.75rem',
                          }}
                        >
                          AI Engineer · PIAIC · LinkedIn
                        </div>
                      </div>
                      <Link
                        to="https://www.linkedin.com/in/marium-afzal23"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#60a5fa',
                          fontSize: '1.2rem',
                          textDecoration: 'none',
                        }}
                      >
                        →
                      </Link>
                    </div>
                  </div>
                )}

                {/* Timestamp */}
                <div
                  className="connect-label"
                  style={{
                    fontSize: '0.62rem',
                    color: 'var(--muted)',
                    textAlign: 'right',
                    marginTop: '4px',
                  }}
                >
                  Just now
                </div>
              </div>
            ))}

            {/* Social Chips Row */}
            {messages.some(m => m.id === 3) && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px',
                  flexWrap: 'wrap',
                }}
              >
                {['🐙 GitHub', '📘 Facebook', '🎮 Discord', '✉️ Email'].map((social, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid var(--border)',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      fontSize: '0.7rem',
                      color: 'var(--muted)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--pink)';
                      e.currentTarget.style.color = 'var(--pink)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--muted)';
                    }}
                  >
                    {social}
                  </div>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Row */}
          <div
            style={{
              padding: '12px 16px',
              display: 'flex',
              gap: '8px',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Message PhysAI Assistant..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                background: 'var(--bg2)',
                color: 'var(--text)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.82rem',
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f72585, #7b2d8b)',
                border: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              ➤
            </button>
          </div>

          {/* Footer Text */}
          <div
            className="connect-label"
            style={{
              padding: '8px 16px',
              textAlign: 'center',
              fontSize: '0.62rem',
              color: 'rgba(157,127,184,.4)',
              borderTop: '1px solid var(--border)',
            }}
          >
            Powered by RAG + Qdrant + Groq LLM
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;