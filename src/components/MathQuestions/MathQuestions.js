import React, { useState } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './MathQuestions.css';

// Example questions array, ensure LaTeX is correctly formatted for KaTeX
const questions = [
    {
        question: "What is the derivative of ",
        math: "\\(x^2\\)",
        questionEnd: "?",
        options: ["\\(2x\\)", "\\(x^2\\)", "\\(2x^2\\)", "None of the above"],
        answer: "2x"  // Correct answer
    },
    {
        question: "What is the integral of ",
        math: "\\(2x \\, dx\\)",
        questionEnd: "?",
        options: ["\\(x^2 + C\\)", "\\(2x^2 + C\\)", "\\(x^2\\)", "None of the above"],
        answer: "x^2 + C"
    },
    {
        question: "Evaluate the limit as ",
        math: "\\(x\\)",
        questionEnd: " approaches 0 of \\(\\frac{\\sin x}{x}\\)?",
        options: ["0", "1", "Infinity", "Undefined"],
        answer: "1"
    }
];

function MathQuestions() {
    const [grade, setGrade] = useState('');
    const [showQuestions, setShowQuestions] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleGradeSelection = (selectedGrade) => {
        setGrade(selectedGrade);  // This could be used for future logic to tailor questions to grades
        setShowQuestions(true);  // Show questions only after a grade is selected
    };

    const handleAnswerOptionClick = (option) => {
        if (option === questions[currentQuestion].answer) {
            alert('Correct Answer!');
        } else {
            alert('Wrong Answer!');
        }
        // Move to next question or wrap around to the first
        const nextQuestion = (currentQuestion + 1) % questions.length;
        setCurrentQuestion(nextQuestion);
    };

    return (
        <div className="math-questions">
            {!showQuestions ? (
                <div className="grade-selection">
                    <h2>Please select your grade:</h2>
                    <div className="grades-container">
                        {Array.from({ length: 7 }, (_, i) => i + 6).map((gradeNumber) => (
                            <button key={gradeNumber} onClick={() => handleGradeSelection(gradeNumber)} className="grade-button">
                                Grade {gradeNumber}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Test Your Knowledge</h2>
                    <div className="question-text">
                        {questions[currentQuestion].question}
                        <InlineMath math={questions[currentQuestion].math} />
                        {questions[currentQuestion].questionEnd}
                    </div>
                    <div className="answer-section">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button key={index} onClick={() => handleAnswerOptionClick(option)}>
                                <InlineMath math={option} />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MathQuestions;
