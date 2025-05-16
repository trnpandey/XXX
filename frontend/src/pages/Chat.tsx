import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useWebSocket from "../hooks/useWebSocket";

const Chat = () => {
  const { token } = useAuth();
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId")!;
  const role = localStorage.getItem("userRole")!;
  const ws = useWebSocket(sessionId, token!, (msg) => setMessages((prev) => [...prev, msg]));

  const sendMessage = () => {
    if (input.trim()) {
      ws.send(JSON.stringify({ text: input }));
      setMessages((prev) => [...prev, { sender: role, text: input }]);
      setInput("");
    }
  };

  const handleEnd = () => {
    ws.send(JSON.stringify({ type: "end" }));
    navigate("/feedback");
  };

  useEffect(() => {
    ws.onclose = () => {
      localStorage.removeItem("sessionId");
      navigate("/matching");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="chat-page">
      <div className="chat-header">
        <span>Session: {sessionId.slice(0, 8)}</span>
        <button onClick={handleEnd}>End Chat</button>
      </div>
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === role ? "mine" : "theirs"}>
            <span>{m.sender === "venter" ? "Venter" : "Listener"}: </span>
            {m.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type here..." />
        <button onClick={sendMessage}>Send</button>
      </div>
      {/* Add session timer, etc here */}
    </div>
  );
};

export default Chat;