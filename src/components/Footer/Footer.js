import React from 'react';
import './Footer.css'; // Ensure the CSS is properly linked

function Footer() {
    return (
        <footer className="footer">
            <p className="footer-address">
                80-14 Northern Blvd, Jackson Heights, NY 11372
            </p>
            <p>Contact us:  
                <a href="mailto:mathpointjh@gmail.com" aria-label="Send email to MathPoint"> mathpointjh@gmail.com</a>
            </p>
            <p>Phone:  
                <a href="tel:+17185551234" aria-label="Call MathPoint"> (718) 555-1234</a>
            </p> {/* Adding a phone number with clickable link */}
            <p>© 2024 MathPoint. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
