// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { setCookie, getCookie, eraseCookie } from './cookieUtils';
import Header from './components/Header/Header';
import GoogleAuth from './components/GoogleAuth/GoogleAuth'; // Import the GoogleAuth component
import Hero from './components/Hero/Hero';
import AboutSection from './components/About/AboutSection';
import Pricing from './components/Pricing/Pricing';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
    const handleSetCookie = () => {
        console.log("Setting cookie");
        setCookie('user', 'JohnDoe', 7);
    };

    const handleGetCookie = () => {
        console.log("Getting cookie");
        alert(`Cookie Value: ${getCookie('user')}`);
    };

    const handleEraseCookie = () => {
        console.log("Erasing cookie");
        eraseCookie('user');
    };

    return (
        <Router>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <div className="App">
                    <Header />
                    <GoogleAuth /> {/* This is where GoogleAuth component is included just below the Header */}
                    <Hero />
                    <AboutSection />
                    <Pricing />
                    <Testimonials />
                    <Footer />
                    {/* Demonstrating cookie functions */}
                    <div>
                        <button onClick={handleSetCookie}>Set Cookie</button>
                        <button onClick={handleGetCookie}>Get Cookie</button>
                        <button onClick={handleEraseCookie}>Delete Cookie</button>
                    </div>
                </div>
            </GoogleOAuthProvider>
        </Router>
    );
}

export default App;
