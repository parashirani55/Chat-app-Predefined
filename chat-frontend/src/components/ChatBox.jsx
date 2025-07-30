import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import TypingIndicator from "./TypingIndicator";
import SuggestionButtons from "./SuggestionButtons";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);

  const defaultSuggestions = [
    "Sales Question",
    "Technical Question",
    "What is the price of product",
    "Do I get discount if I buy more than 1 product",
    "how do I create an account",
    "how do I reset my password if I forgot it"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (msg) => {
    const newMessages = [...messages, { sender: "user", text: msg }];
    setMessages(newMessages);
    setUserInput("");
    setTyping(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/chat/send", {
        message: msg,
      });

      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: res.data.reply },
        ]);
        setSuggestions(res.data.suggestions || []);
      }, res.data.delay || 1000);
    } catch (error) {
      console.error("Chat API error", error);
      setTyping(false);
    }
  };

  return (
    <div
      className="chat-container"
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 20,
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        background: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        className="chat-messages"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          paddingBottom: 10,
          marginBottom: 10,
          borderBottom: "1px solid #eee",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.sender === "user" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px 15px",
                borderRadius: "20px",
                background: m.sender === "user" ? "#007bff" : "#f1f0f0",
                color: m.sender === "user" ? "#fff" : "#000",
                maxWidth: "80%",
                wordBreak: "break-word",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Show suggestions only at the start of a new chat */}
      {messages.length === 0 ? (
        <SuggestionButtons
          suggestions={defaultSuggestions}
          onSelect={sendMessage}
        />
      ) : (
        <SuggestionButtons
          suggestions={suggestions}
          onSelect={sendMessage}
        />
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (userInput.trim()) sendMessage(userInput);
        }}
        style={{ display: "flex", marginTop: 10 }}
      >
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "20px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: 10,
            padding: "10px 20px",
            border: "none",
            borderRadius: "20px",
            background: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
