// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="logo">
            <div className="logo-icon">💰</div>
            <h1>Smart Goal Planner</h1>
          </div>
          
          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
        </div>

        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" className="active">Dashboard</Link></li>
            <li><Link to="/goals">My Goals</Link></li>
            <li><Link to="/insights">Insights</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
          
          <div className="navbar-actions">
            <button className="btn-notification">
              <span className="notification-icon">🔔</span>
              <span className="notification-count">3</span>
            </button>
            <div className="user-avatar">
              <div className="avatar">JS</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;