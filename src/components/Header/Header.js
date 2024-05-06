// src/components/Header/Header.js
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import './Header.css';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

function Header() {
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!isModalOpen);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        alert('Form submitted!');
        setModalOpen(false);
    };

    return (
        <header className="header">
            <img src={logo} alt="MathPoint Logo" className="site-logo" />
            <div className="social-media-icons">
                <a href="https://www.facebook.com/YourPage" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="https://www.instagram.com/YourUsername" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://www.tiktok.com/@YourUsername" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTiktok} />
                </a>
            </div>
            <button className="signup-button" onClick={toggleModal}>
                Sign Up for Free Session
            </button>
            <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <h2>Sign Up for a Free Session</h2>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="parentName" className="form-label">
                        Parent Name:
                        <input type="text" id="parentName" name="parentName" required className="form-input" />
                    </label>
                    <label htmlFor="studentName" className="form-label">
                        Student Name:
                        <input type="text" id="studentName" name="studentName" required className="form-input" />
                    </label>
                    <label htmlFor="school" className="form-label">
                        School:
                        <input type="text" id="school" name="school" required className="form-input" />
                    </label>
                    <label htmlFor="grade" className="form-label">
                        Grade:
                        <input type="text" id="grade" name="grade" required className="form-input" />
                    </label>
                    <label htmlFor="parentEmail" className="form-label">
                        Parent Email:
                        <input type="email" id="parentEmail" name="parentEmail" required className="form-input" />
                    </label>
                    <label htmlFor="studentEmail" className="form-label">
                        Student Email:
                        <input type="email" id="studentEmail" name="studentEmail" required className="form-input" />
                        </label>
                    <label htmlFor="phoneNumber" className="form-label">
                        Phone Number:
                        <input type="tel" id="phoneNumber" name="phoneNumber" required className="form-input" />
                    </label>
                    <button type="submit" className="form-button">Submit</button>
                    <button type="button" onClick={toggleModal} className="form-button cancel">Cancel</button>
                </form>
            </Modal>
        </header>
    );
}

export default Header;
