// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import AboutSection from './components/About/AboutSection';
import Pricing from './components/Pricing/Pricing';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
    return (
        <Router>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <div className="App">
                    <Header />
                    <Hero />
                    <AboutSection />
                    <Pricing />
                    <Testimonials />
                    <Footer />
                </div>
            </GoogleOAuthProvider>
        </Router>
    );
}

export default App;
