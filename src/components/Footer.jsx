// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-icon">💰</div>
            <div>
              <h3>Smart Goal Planner</h3>
              <p>Your financial goals, our expertise</p>
            </div>
          </div>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <span>📱</span>
            </a>
            <a href="#" aria-label="Twitter">
              <span>🐦</span>
            </a>
            <a href="#" aria-label="Instagram">
              <span>📸</span>
            </a>
            <a href="#" aria-label="LinkedIn">
              <span>👔</span>
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Product</h4>
            <ul>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/tutorials">Tutorials</Link></li>
              <li><Link to="/updates">Updates</Link></li>
            </ul>
          </div>
          
          <div className="link-group">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="link-group">
            <h4>Support</h4>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>© 2025 Fintech Solutions. All rights reserved.</p>
          <div className="legal-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;