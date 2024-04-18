import React from 'react';
import Navbar from './components/Navbar/Navbar'; // Import the Navbar component
import Hero from './components/Hero/Hero'; // Import the Hero section component
import AboutSection from './components/About/AboutSection'; // Import the About Section component
import Footer from './components/Footer/Footer'; // Import the Footer component
import './App.css'; // Main stylesheet for App

function App() {
    return (
        <div className="App">
            <Navbar /> {/* Navigation bar at the top of the page */}
            <Hero />   {/* Hero section for impactful visual introduction */}
            <AboutSection /> {/* Detailed about section with comprehensive info about MathPoint */}
            <Footer /> {/* Footer at the bottom of the page with additional links and information */}
        </div>
    );
}

export default App;
