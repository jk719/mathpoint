import React from 'react';
import './Modal.css'; // Import the styles specifically for the modal

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    // Function to stop the click event from propagating to the overlay
    const handleOverlayClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={handleOverlayClick}>
                {children}
                <button onClick={onClose} className="close-button">&times;</button>
            </div>
        </div>
    );
}

export default Modal;
