import React, { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  type: 'bot' | 'user';
  time: string;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm the AI assistant for this Physical AI & Humanoid Robotics textbook 👋",
      type: 'bot',
      time: 'Just now',
    },
    {
      text: '📖 Made with ❤️ by Marium Afzal — AI Engineer & Aspiring Robotics Engineer · PIAIC',
      type: 'bot',
      time: 'Just now',
    },
    {
      text: 'Ask me anything about ROS 2, Gazebo, NVIDIA Isaac, or VLA! 🚀',
      type: 'bot',
      time: 'Just now',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function now() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function sendMsg() {
    if (!input.trim()) return;
    const userMsg: Message = { text: input.trim(), type: 'user', time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      const botMsg: Message = {
        text: 'Please login to use the full AI chatbot — I can search all 14 chapters to answer your question! 🚀',
        type: 'bot',
        time: now(),
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  }

  return (
    <>
      <button
        className="chat-bubble"
        onClick={() => setOpen(!open)}
        aria-label="Open chatbot"
      >
        💬
      </button>

      {open && (
        <div className="chat-panel open">
          <div className="chat-head">
            <div className="chat-head-left">
              <div className="chat-av">🤖</div>
              <div>
                <div className="chat-title">PhysAI Assistant</div>
                <div className="chat-status">Online · Ready to help</div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.type}`}>
                <div className="msg-bubble" dangerouslySetInnerHTML={{ __html: msg.text }} />
                <div className="msg-time">{msg.time}</div>
              </div>
            ))}

            {/* LinkedIn + Social — always shown */}
            <div className="author-connect">
              <div className="connect-label">// Connect with the author</div>
              <a
                href="https://www.linkedin.com/in/marium-afzal23"
                target="_blank"
                rel="noreferrer"
                className="linkedin-card"
              >
                <div className="li-icon">💼</div>
                <div className="li-text">
                  <div className="li-name">Marium Afzal</div>
                  <div className="li-sub">AI Engineer · PIAIC · LinkedIn</div>
                </div>
                <div className="li-arrow">→</div>
              </a>
              <div className="social-chips">
                <a href="https://github.com/MariumAfzal2703" target="_blank" rel="noreferrer" className="s-chip">🐙 GitHub</a>
                <a href="https://web.facebook.com/profile.php?id=61579044938516" target="_blank" rel="noreferrer" className="s-chip">📘 FB</a>
                <a href="https://discord.gg/V3y73PRF" target="_blank" rel="noreferrer" className="s-chip">🎮 Discord</a>
                <a href="mailto:mariumafzal.contact@gmail.com" className="s-chip">✉️ Email</a>
              </div>
            </div>
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            <div className="chat-input-row">
              <input
                className="chat-input"
                placeholder="Ask about the textbook..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
              />
              <button className="chat-send" onClick={sendMsg}>➤</button>
            </div>
          </div>
          <div className="chat-powered">Powered by RAG + Qdrant + Groq LLM</div>
        </div>
      )}
    </>
  );
}