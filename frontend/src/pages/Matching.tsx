import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { checkSessionStatus } from "../services/api";

const guidelines = [
  "Be respectful and supportive.",
  "Confidentiality is important.",
  "No sharing personal info.",
  "Report abuse or inappropriate behavior.",
];

const Matching = () => {
  const { token } = useAuth();
  const [ack, setAck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ack) return;
    const interval = setInterval(async () => {
      const result = await checkSessionStatus(token!);
      if (result.sessionId) {
        localStorage.setItem("sessionId", result.sessionId);
        navigate("/chat");
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [ack, token, navigate]);

  return (
    <div className="matching-page">
      <div className="carousel">
        {guidelines.map((g, i) => (
          <div key={i} className="guideline">{g}</div>
        ))}
      </div>
      {!ack ? (
        <button
          className="matching-accept-btn"
          onClick={() => setAck(true)}
        >
          Please accept and proceed
        </button>
      ) : (
        <div>Matching you now...</div>
      )}
    </div>
  );
};

export default Matching;