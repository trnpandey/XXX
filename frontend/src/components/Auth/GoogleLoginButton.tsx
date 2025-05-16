import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

const GoogleLoginButton: React.FC = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      await signInWithPopup(auth, provider);
      // Do not navigate here; let Landing handle it after token is set
    } catch {
      alert("Google sign-in failed.");
    }
  };

  return (
    <button className="google-login" onClick={handleLogin}>
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;