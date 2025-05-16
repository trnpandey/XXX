import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig";

initializeApp(firebaseConfig);

type AuthContextType = {
  user: User | null;
  token: string | null;
  setToken: (t: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const tok = await firebaseUser.getIdToken();
        setToken(tok);
        localStorage.setItem("token", tok);
      } else {
        setToken(null);
        localStorage.removeItem("token");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};