import React from 'react';
import './Home.css'; // Import the CSS file for styling

function Home() {
    return (
        <div className="home">
            <h2>Welcome to MathPoint</h2>
            <p>Your journey to understanding and mastering math starts here. At MathPoint, we offer personalized tutoring services that cater to all levels of students. Whether you're struggling with basic concepts or need advanced problem-solving skills, our expert tutors are here to help.</p>
            <button onClick={() => alert('Learn more about our services')}>Learn More</button>
        </div>
    );
}

export default Home;
