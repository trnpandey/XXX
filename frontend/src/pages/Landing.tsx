import React, { useEffect } from "react";
import GoogleLoginButton from "../components/Auth/GoogleLoginButton";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  return (
    <div className="centered-landing">
      {/* Sample SVG logo */}
      <svg
        className="logo"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: "1.5rem" }}
      >
        <circle cx="40" cy="40" r="38" fill="#6366f1" stroke="#818cf8" strokeWidth="4"/>
        <ellipse cx="40" cy="48" rx="18" ry="10" fill="#fff" />
        <circle cx="30" cy="36" r="4" fill="#fff"/>
        <circle cx="50" cy="36" r="4" fill="#fff"/>
        <path d="M34 50 Q40 56 46 50" stroke="#6366f1" strokeWidth="2" fill="none" />
      </svg>
      <h1>CalmKarlo</h1>
      <GoogleLoginButton />
    </div>
  );
};

export default Landing;