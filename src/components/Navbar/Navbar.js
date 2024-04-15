// Navbar.js
import React from 'react';
import './Navbar.css';  // Link to the CSS file for styling

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-logo">
                    MathPoint Learning Corner
                </a>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <a href="#about" className="navbar-links">About</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#services" className="navbar-links">Services</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#contact" className="navbar-links">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
