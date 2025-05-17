import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { joinQueue } from "../services/api";

const Home = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleStart = async (role: "venter" | "listener") => {
    if (!token) return;
    //TODO: Uncomment the following line when the joinQueue function is implemented
    //await joinQueue(role, token);
    localStorage.setItem("userRole", role);
    navigate("/matching");
  };

  return (
    <div className="home-page">
      <h2>Welcome!</h2>
      <button onClick={() => handleStart("venter")}>Start Venting</button>
      <button onClick={() => handleStart("listener")}>Start Listening</button>
    </div>
  );
};

export default Home;