import React, { useRef, useEffect } from 'react';
import './Testimonials.css';  // Ensure the CSS file is linked for styling

const testimonialsData = [
    { id: 1, text: "Since starting at MathPoint, my daughter's confidence in math has soared, especially in algebra. Her grades improved dramatically in just a few months.", name: "Sofia Chen" },
    { id: 2, text: "MathPoint’s tailored approach to geometry helped my son grasp challenging concepts. The progress he's made is remarkable.", name: "Raj Patel" },
    { id: 3, text: "Interactive lessons on trigonometry have significantly helped my daughter understand and apply complex math concepts.", name: "Eliana Johnson" },
    { id: 4, text: "My child now enjoys math thanks to the personalized attention and supportive environment at MathPoint.", name: "Carlos Rodriguez" },
    { id: 5, text: "MathPoint's teaching methods and the patience of their tutors have made a huge difference. My daughter is now thriving in calculus.", name: "Fatima Al-Farsi" },
    { id: 6, text: "Seeing my daughter excel in calculus and improve her problem-solving skills has been incredibly satisfying.", name: "Grace Kim" }
];

function Testimonials() {
    const testimonialsContainerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    testimonialsContainerRef.current.style.animation = 'none';
                    setTimeout(() => {
                        testimonialsContainerRef.current.style.animation = 'nudge 2s ease-out 1';
                    }, 10);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(testimonialsContainerRef.current);
        return () => observer.disconnect(); 
    }, []);

    return (
        <div className="universal-section">
            <h2 className="testimonials-heading">testimonials</h2>
            <div className="testimonials-container" ref={testimonialsContainerRef}>
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
