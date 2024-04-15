import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        // Prevents modal close when clicking inside the modal content
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
