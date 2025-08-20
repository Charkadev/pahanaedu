// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.jpg";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth", { state: { showLogin: true } }); // navigate to Auth page showing login
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand-link">
          <img src={logo} alt="Pahana Edu Logo" className="brand-logo" />
        </Link>

        <Link to="/" className="nav-link">Home</Link>
        <Link to="/help" className="nav-link">Help</Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="user-info">
              Logged in as: <b>{user.username}</b> ({user.role})
            </span>
            <button className="navbar-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button className="navbar-btn" onClick={handleLoginClick}>Login</button>
        )}
      </div>
    </nav>
  );
}
