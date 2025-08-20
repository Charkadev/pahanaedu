import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home({ user }) {
  return (
    <div className="home-container">
      <h1>Welcome, {user?.username || "Guest"}!</h1>
      <p>Select a section to manage:</p>

      <div className="home-sections">
        <Link to="/customers"><button>Customers</button></Link>
        <Link to="/items"><button>Items</button></Link>
        <Link to="/orders"><button>Orders</button></Link>
        <Link to="/billing"><button>Billing</button></Link>
      </div>
    </div>
  );
}
