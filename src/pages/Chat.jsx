import React, { useState, useRef, useEffect } from "react";
import axios from "../api/axiosConfig";
import "../styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "Assistant", text: "Hi! How can I help you today?" },
    { sender: "You", text: "What is your return policy?" },
    {
      sender: "Assistant",
      text: "You can return products within 30 days of delivery.",
    },
  ]);
  const [input, setInput] = useState("");
  const userName = localStorage.getItem("name");

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/chat/message",
        { message: input },
        { headers: { Authorization: token } }
      );

      const botMessage = { sender: "Assistant", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        sender: "Assistant",
        text: "Sorry, I couldn't understand that. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>Welcome, {userName} 👋</h2>
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "You" ? "user" : "assistant"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          placeholder="Ask me anything..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
