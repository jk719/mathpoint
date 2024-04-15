import React, { useState } from 'react';
import './Hero.css';
import heroImage from '../../assets/images/hero-image-mathpoint.png';
import Modal from '../Modal/Modal';

function Hero() {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form Submitted!'); // Implement actual form submission logic here
        setModalOpen(false);
    };

    return (
        <div className="hero">
            <img src={heroImage} alt="Engaging Tutoring" className="hero-image"/>
            <button onClick={() => setModalOpen(true)} className="signup-button">
                Sign Up for Free Session
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="parentName">Parent/Guardian Full Name:</label>
                    <input type="text" id="parentName" required />

                    <label htmlFor="studentName">Student Full Name:</label>
                    <input type="text" id="studentName" required />

                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" required />

                    <label htmlFor="school">School:</label>
                    <input type="text" id="school" required />

                    <label htmlFor="grade">Grade:</label>
                    <input type="text" id="grade" required />

                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required />

                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </Modal>
        </div>
    );
}

export default Hero;
