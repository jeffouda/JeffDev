import React, { useState } from 'react';
import './Navbar.css'; // Import the new CSS

function Navbar() {
  // State to track if menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        Jeff<span className="accent">.Dev</span>
      </div>

      {/* The Hamburger Icon (Only visible on mobile) */}
      <button className="menu-icon" onClick={toggleMenu}>
        {isOpen ? '✕' : '☰'} 
      </button>

      {/* The Links */}
      {/* If isOpen is true, we add the "active" class which makes it visible in CSS */}
      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <a href="#projects" className="nav-link" onClick={() => setIsOpen(false)}>
          Projects
        </a>
        <a href="#contact" className="nav-link" onClick={() => setIsOpen(false)}>
          Contact
        </a>
        <a 
          href="https://github.com/YOUR_GITHUB_USER" 
          target="_blank" 
          className="github-btn"
          onClick={() => setIsOpen(false)}
        >
           GitHub Profile
        </a>
      </div>
    </nav>
  );
}

export default Navbar;