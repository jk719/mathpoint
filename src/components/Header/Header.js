import React from 'react';
import './Header.css'; // Make sure your CSS file path is correct

function Header() {
    return (
        <header className="site-header">
            <h1 className="header-title">MathPoint</h1>
            <nav className="header-nav">
                {/* Assuming you have some navigation links, they can go here */}
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
