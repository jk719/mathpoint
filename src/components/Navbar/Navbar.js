import React from 'react';
import './Navbar.css'; // Ensure CSS is properly linked
import logo from '../../assets/logo.png'; // Update the path to where your logo is stored

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="MathPoint Logo" />
            </div>
            <ul className="navbar-menu">
                <li className="navbar-item"><a href="#home" className="navbar-links">Home</a></li>
                <li className="navbar-item"><a href="#about" className="navbar-links">About</a></li>
                <li className="navbar-item"><a href="#services" className="navbar-links">Services</a></li>
                <li className="navbar-item"><a href="#contact" className="navbar-links">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
