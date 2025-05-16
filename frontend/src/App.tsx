import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Matching from "./pages/Matching";
import Chat from "./pages/Chat";
import Feedback from "./pages/Feedback";
import ErrorPage from "./pages/Error";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;