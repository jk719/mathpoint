// AboutSection.js
import React from 'react';
import './AboutSection.css'; // Ensure the CSS file is linked for styling

// Importing images
import personalizedLearningImage from '../../assets/images/Personalized Learning Paths.jpg';
import communityLearningImage from '../../assets/images/Community-Based Learning Centers.jpg';
import engagingCurriculumImage from '../../assets/images/Dynamic and Engaging Curriculum.jpg';
import flexibleSchedulingImage from '../../assets/images/Scheduling That Fits Your Life.jpg';
// Replace the below imports with the correct paths if the images exist
import affordablePricingImage from '../../assets/images/affordable_pricing_image.jpg'; 
import technologyEnhancedLearningImage from '../../assets/images/technology_enhanced_learning_image.jpg'; 

function AboutSection() {
    return (
        <div className="about-container">
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
                <img src={communityLearningImage} alt="Community-Based Learning Centers" />
                <h3>Community-Based Learning Centers</h3>
                <ul>
                    <li>Locations in community pharmacies <span className="translation">(Ubicaciones en farmacias comunitarias)</span></li>
                    <li>Safe, accessible learning spaces <span className="translation">(Espacios de aprendizaje seguros y accesibles)</span></li>
                    <li>Education as a community pillar <span className="translation">(La educación como pilar de la comunidad)</span></li>
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
                <img src={flexibleSchedulingImage} alt="Scheduling That Fits Your Life" />
                <h3>Scheduling That Fits Your Life</h3>
                <ul>
                    <li>Evening and post-school sessions <span className="translation">(Sesiones por la tarde y después de la escuela)</span></li>
                    <li>Family-friendly scheduling <span className="translation">(Horarios adecuados para la familia)</span></li>
                </ul>
            </div>
            <div className="about-item">
                <img src={affordablePricingImage} alt="Transparent and Affordable Pricing" />
                <h3>Transparent and Affordable Pricing</h3>
                <ul>
                    <li>$30 per session <span className="translation">(30 dólares por sesión)</span></li>
                    <li>Bulk session discounts <span className="translation">(Descuentos por sesiones en bloque)</span></li>
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
    );
}

export default AboutSection;
