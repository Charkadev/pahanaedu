import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 Pahana Edu Bookshop. All rights reserved.</p>
      <p>
        <Link to="/help" className="footer-link">Help</Link> |
        <Link to="/privacy" className="footer-link">Privacy Policy</Link>
      </p>
    </footer>
  );
}
