import React, { useState } from 'react';
import './nav.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">AfaQ</div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        <div className="navbar-toggle-icon"></div>
        <div className="navbar-toggle-icon"></div>
        <div className="navbar-toggle-icon"></div>
      </button>
      <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <ul className="navbar-list">
          <li className="navbar-item">
            <a href="#home" className="navbar-link">Home</a>
          </li>
          <li className="navbar-item">
            <a href="#about" className="navbar-link">About</a>
          </li>
          <li className="navbar-item">
            <a href="#contact" className="navbar-link">Contact</a>
          </li>
          <li className="navbar-item">
            <a href="#profile" className="navbar-link">Profile</a>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
