import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { submitFeedback } from "../services/api";

const Feedback = () => {
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();
  const { token } = useAuth();
  const sessionId = localStorage.getItem("sessionId")!;

  const handleSubmit = async () => {
    await submitFeedback(token!, sessionId, rating);
    localStorage.removeItem("sessionId");
    navigate("/home");
  };

  return (
    <div className="feedback-page">
      <h2>How was your chat?</h2>
      <input type="range" min={1} max={5} value={rating} onChange={e => setRating(Number(e.target.value))} />
      <span>{rating} Stars</span>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Feedback;