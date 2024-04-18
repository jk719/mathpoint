import React from 'react';
import './Footer.css'; // Ensure the CSS is properly linked

function Footer() {
    return (
        <footer className="footer">
            <p className="footer-address">
                80-14 Northern Blvd, Jackson Heights, NY 11372
            </p>
            <p>© 2024 MathPoint. All rights reserved.</p>
            <p>Contact us: <a href="mailto:mathpointjh@gmail.com">info@mathpoint.com</a></p>
        </footer>
    );
}

export default Footer;
