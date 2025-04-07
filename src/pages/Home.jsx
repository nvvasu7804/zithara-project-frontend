import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to AI Customer Query Assistant</h1>
      <p>This chatbot helps customers get instant answers!</p>
      <div className="home-buttons">
        <Link to="/login" className="home-btn">
          Login
        </Link>
        <Link to="/register" className="home-btn">
          Register
        </Link>
        <Link to="/chat" className="home-btn">
          Chat Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
