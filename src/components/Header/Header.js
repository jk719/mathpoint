import React from 'react';
import Navbar from '../Navbar/Navbar';  // Ensure this path is correct
import './Header.css';
import logo from '../../assets/logo.png'; // Correct and only path needed

function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <img src={logo} alt="MathPoint Logo" className="site-logo" />
                <Navbar />
            </div>
            <button className="signup-button" onClick={() => window.location.href='/signup'}>
                Sign Up for Free Session
            </button>
        </header>
    );
}

export default Header;
