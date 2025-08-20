// src/pages/Auth.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import RegisterForm from "../components/RegisterForm";
import "./Auth.css";

export default function Auth({ onLoginSuccess, defaultShowLogin = true }) {
  const location = useLocation();
  const [showRegister, setShowRegister] = useState(!defaultShowLogin);

  useEffect(() => {
    if (location.state && location.state.showLogin !== undefined) {
      setShowRegister(!location.state.showLogin);
    }
  }, [location.state]);

  const handleRegisterSuccess = () => {
    alert("Registration successful! Please log in.");
    setShowRegister(false);
  };

  return (
    <div className="app-auth-container">
      {showRegister ? (
        <>
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
          <p>
            Already have an account?{" "}
            <button className="switch-btn" onClick={() => setShowRegister(false)}>
              Login
            </button>
          </p>
        </>
      ) : (
        <>
          <Login onLoginSuccess={onLoginSuccess} />
          <p>
            Don’t have an account?{" "}
            <button className="switch-btn" onClick={() => setShowRegister(true)}>
              Register
            </button>
          </p>
        </>
      )}
    </div>
  );
}
