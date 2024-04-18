import React from 'react';
import Header from './components/Header/Header'; // Import the Header component
import Hero from './components/Hero/Hero'; // Import the Hero section component
import AboutSection from './components/About/AboutSection'; // Import the About Section component
import Testimonials from './components/Testimonials/Testimonials'; // Import the Testimonials component
import Footer from './components/Footer/Footer'; // Import the Footer component
import './App.css'; // Main stylesheet for App

function App() {
    return (
        <div className="App">
            <Header /> {/* Replaces Navbar with Header that includes Navbar */}
            <Hero />   {/* Hero section for impactful visual introduction */}
            <AboutSection /> {/* Detailed about section with comprehensive info about MathPoint */}
            <Testimonials /> {/* Testimonials section to showcase client feedback */}
            <Footer /> {/* Footer at the bottom of the page with additional links and information */}
        </div>
    );
}

export default App;
