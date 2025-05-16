import React from "react";
import GoogleLoginButton from "../components/Auth/GoogleLoginButton";

const Landing = () => (
  <div className="centered-landing">
    <img src="/logo192.png" alt="Logo" className="logo" />
    <h1>Venter-Listener</h1>
    <GoogleLoginButton />
  </div>
);

export default Landing;