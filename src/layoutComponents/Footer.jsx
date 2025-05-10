import React from 'react';
import { Link } from 'react-router-dom';
import './style/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="containerFooter">
        <nav className="footer-nav">
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contacts">Contact</Link></li>
            <li><Link to="/traveltips">Travel Tips</Link></li>
          </ul>
        </nav>
        <p>&copy; 2024 Travel Temptation. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

