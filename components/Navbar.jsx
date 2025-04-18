// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';

function Navbar({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          PratikPortfolio
        </Link>

        <div className="navbar-right">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? '🌞' : '🌙'}
          </button>

          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="hamburger"></span>
          </button>

          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
            <li><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
            <li><a href="#blog" onClick={() => setMenuOpen(false)}>Blog</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;