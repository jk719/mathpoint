// AboutSection.js
import React from 'react';
import './AboutSection.css'; // Ensure the CSS file is linked

function AboutSection() {
    return (
        <div className="about-container">
            <div className="about-item">
                <h3>Personalized Learning</h3>
                <p>Every student receives individualized attention within our collaborative group sessions. We assess each student's unique needs and strengths, aligning our instruction with their school curriculum and working in concert with their classroom teachers. This ensures a seamless integration of our tutoring with their ongoing education.</p>
            </div>
            <div className="about-item">
                <h3>Community-Centric Locations</h3>
                <p>We are conveniently located within local pharmacies, offering a safe and accessible space for learning. Our unique partnership with these community hubs underscores our commitment to being a part of our students’ daily lives, making education an integral component of the community.</p>
            </div>
            <div className="about-item">
                <h3>Engaging Curriculum</h3>
                <p>Our sessions are dynamic and engaging, starting with multimedia resources that introduce daily math concepts, followed by hands-on problem-solving with our experienced tutors. We cap off each session with independent work, allowing students to apply what they've learned while having support readily available.</p>
            </div>
            <div className="about-item">
                <h3>Flexible Scheduling</h3>
                <p>Understanding the busy lives of our students and their families, we offer our tutoring services from Monday to Friday, 4 PM to 8 PM, accommodating after-school schedules.</p>
            </div>
            <div className="about-item">
                <h3>Transparent Pricing</h3>
                <p>Our pricing is straightforward: $30 per session with discounted packages available to foster long-term learning relationships. We provide a range of options to ensure our services are accessible to all in our community.</p>
            </div>
            <div className="about-item">
                <h3>Innovative Technology</h3>
                <p>By incorporating tools like Google Classroom, we streamline homework and curriculum delivery, while Teachworks keeps our administrative functions and communication with parents smooth and efficient.</p>
            </div>
        </div>
    );
}

export default AboutSection;
