import React, { useState } from 'react';
import './Hero.css';

const questions = [
  { id: 1, question: "What is 7 x 8?", options: ["54", "56", "49", "63"], answer: "56" },
  { id: 2, question: "What is the square root of 144?", options: ["12", "14", "16", "10"], answer: "12" },
  { id: 3, question: "What is 15% of 200?", options: ["30", "25", "50", "20"], answer: "30" },
  { id: 4, question: "What is the sum of angles in a triangle?", options: ["180 degrees", "360 degrees", "90 degrees", "270 degrees"], answer: "180 degrees" },
  { id: 5, question: "What is 9 + 10?", options: ["21", "19", "18", "20"], answer: "19" }
];

function Hero() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const startQuiz = () => {
        setQuizStarted(true);
        setCurrentQuestionIndex(0); // Reset to the first question
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert('Quiz completed!');
            setQuizStarted(false); // Optionally reset or navigate elsewhere
        }
    };

    return (
        <div className="hero">
            <div className="hero-content">
                {!quizStarted ? (
                    <button className="grade-circle" onClick={startQuiz}>
                        Start Quiz
                    </button>
                ) : (
                    <div>
                        <h2>{questions[currentQuestionIndex].question}</h2>
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <button key={index} onClick={nextQuestion} className="option-button">
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Hero;
