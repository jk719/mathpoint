import React, { useEffect, useRef } from 'react';
import './AboutSection.css'; // Ensure the CSS file is linked for styling

// Importing images
import personalizedLearningImage from '../../assets/images/Personalized Learning Paths.jpg';
import engagingCurriculumImage from '../../assets/images/Dynamic and Engaging Curriculum.jpg';
import technologyEnhancedLearningImage from '../../assets/images/technology_enhanced_learning_image.jpg'; 

function AboutSection() {
    const aboutContainerRef = useRef(null);

    useEffect(() => {
        const aboutContainer = aboutContainerRef.current;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutContainer.style.animation = 'none'; // Reset animation
                    setTimeout(() => {
                        aboutContainer.style.animation = 'nudge 2s ease-out 1';
                    }, 10); // Re-apply animation
                }
            });
        }, { threshold: 0.5 });

        if (aboutContainer) {
            observer.observe(aboutContainer);
        }

        return () => {
            if (aboutContainer) {
                observer.unobserve(aboutContainer);
            }
        };
    }, []);

    return (
        <div className="universal-section">
            <h2 className="about-header">Discover Your Path to Mastery!</h2>
            <div className="about-container" ref={aboutContainerRef}>
                <div className="about-item">
                    <img src={personalizedLearningImage} alt="Personalized Learning" />
                    <h3>Personalized Learning Paths</h3>
                    <ul>
                        <li>Tailored group sessions <span className="translation">(Sesiones de grupo a medida)</span></li>
                        <li>School curriculum alignment <span className="translation">(Alineación con el currículo escolar)</span></li>
                        <li>Partnership with classroom teachers <span className="translation">(Colaboración con profesores de aula)</span></li>
                    </ul>
                </div>
                <div className="about-item">
                    <img src={engagingCurriculumImage} alt="Dynamic and Engaging Curriculum" />
                    <h3>Dynamic and Engaging Curriculum</h3>
                    <ul>
                        <li>Multimedia-based teaching <span className="translation">(Enseñanza basada en multimedia)</span></li>
                        <li>Expert-guided problem-solving <span className="translation">(Resolución de problemas guiada por expertos)</span></li>
                        <li>Supportive independent learning <span className="translation">(Aprendizaje independiente con apoyo)</span></li>
                    </ul>
                </div>
                <div className="about-item">
                    <img src={technologyEnhancedLearningImage} alt="Technology-Enhanced Learning" />
                    <h3>Technology-Enhanced Learning</h3>
                    <ul>
                        <li>Google Classroom integration <span className="translation">(Integración con Google Classroom)</span></li>
                        <li>Efficient Teachworks management <span className="translation">(Gestión eficiente con Teachworks)</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AboutSection;
