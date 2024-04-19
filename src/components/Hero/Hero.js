import React, { useState } from 'react';
import './Hero.css';

const questions = [
    { id: 1, question: "What is 7 x 8?", options: ["54", "56", "49", "63"], answer: "56" },
    { id: 2, question: "What is the square root of 144?", options: ["12", "14", "16", "10"], answer: "12" },
    { id: 3, question: "What is 15% of 200?", options: ["30", "25", "50", "20"], answer: "30" },
    { id: 4, question: "What is the sum of angles in a triangle?", options: ["180", "360", "90", "270"], answer: "180" },
    { id: 5, question: "What is 9 + 10?", options: ["21", "19", "18", "20"], answer: "19" },
    // Add other questions as needed
];

function Hero() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);

    const startQuiz = () => {
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setQuizComplete(false);
    };

    const handleAnswer = (option) => {
        if (option === questions[currentQuestionIndex].answer) {
            setCorrectAnswers(prev => prev + 1);
        } else {
            setIncorrectAnswers(prev => prev + 1);
        }
        nextQuestion();
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizComplete(true);
            setTimeout(() => {
                setQuizStarted(false);
                setQuizComplete(false);
            }, 30000);
        }
    };

    return (
        <div className="hero">
            {quizStarted ? (
                quizComplete ? (
                    <div>
                        <h2>Quiz Completed!</h2>
                        <p>You got {correctAnswers} out of {questions.length} right.</p>
                        <button onClick={startQuiz} className="grade-circle">Restart Quiz</button>
                    </div>
                ) : (
                    <div>
                        <h2>{questions[currentQuestionIndex].question}</h2>
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <button key={index} onClick={() => handleAnswer(option)} className="option-button">
                                {option}
                            </button>
                        ))}
                    </div>
                )
            ) : (
                <button onClick={startQuiz} className="grade-circle">Start Quiz</button>
            )}
        </div>
    );
}

export default Hero;
