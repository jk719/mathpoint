import React from 'react';
import './Testimonials.css';  // Ensure the CSS file is linked for styling

const testimonialsData = [
    { id: 1, text: "The tutoring services at MathPoint are top-notch. My daughter's grades improved significantly!", name: "Jane Doe" },
    { id: 2, text: "I highly recommend MathPoint. The tutors are knowledgeable and genuinely care about student success.", name: "John Smith" },
    { id: 3, text: "MathPoint has been a game-changer for my son's education. The interactive lessons are fantastic.", name: "Alice Johnson" },
    { id: 4, text: "Thanks to MathPoint, my child now loves math. The personalized attention was exactly what he needed.", name: "Michael Brown" },
    { id: 5, text: "We've tried several tutoring centers, but MathPoint stands out for its effective teaching methods.", name: "Sarah Davis" },
    { id: 6, text: "MathPoint tutors helped my daughter excel in her calculus course. We're thrilled with the progress!", name: "Emily Wilson" }
];

function Testimonials() {
    return (
        <div className="testimonials-section">
            <h2 className="testimonials-heading">What Our Students Say</h2>
            <div className="testimonials-container">
                {testimonialsData.map(testimonial => (
                    <div key={testimonial.id} className="testimonial">
                        <p className="testimonial-text">"{testimonial.text}"</p>
                        <p className="testimonial-author">- {testimonial.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Testimonials;
