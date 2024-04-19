import React, { useState } from 'react';
import './Hero.css';
import Modal from '../Modal/Modal';

// Array of questions for the quiz
const questions = [
    { id: 1, question: "What is 7 x 8?", options: ["54", "56", "49", "63"], answer: "56" },
    { id: 2, question: "What is the square root of 144?", options: ["12", "14", "16", "10"], answer: "12" },
    { id: 3, question: "What is 15% of 200?", options: ["30", "25", "50", "20"], answer: "30" },
    { id: 4, question: "What is the sum of angles in a triangle?", options: ["180", "360", "90", "270"], answer: "180" },
    { id: 5, question: "What is 9 + 10?", options: ["21", "19", "18", "20"], answer: "19" },
    { id: 6, question: "What is the value of x if 5x + 3 = 18?", options: ["3", "15", "30", "5"], answer: "3" },
    { id: 7, question: "What is the area of a circle with a radius of 4 units?", options: ["16π", "32π", "64π", "8π"], answer: "16π" },
    { id: 8, question: "If y varies directly with x, and y = 20 when x = 5, what is y when x = 8?", options: ["32", "16", "24", "28"], answer: "32" },
    { id: 9, question: "What is the probability of rolling a total of 8 with two dice?", options: ["1/12", "1/6", "1/8", "1/10"], answer: "1/6" },
];


function Hero() {
    // State hooks for managing quiz state
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [grade, setGrade] = useState(''); // Additional state for grade input

    const startQuiz = () => {
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
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
            setQuizStarted(false);
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const correctProgress = (correctAnswers / questions.length) * 100;
    const incorrectProgress = (incorrectAnswers / questions.length) * 100;

    return (
        <div className="hero">
            {!quizStarted && (
                <>
                    <label htmlFor="gradeInput" className="grade-label">Enter your grade:</label>
                    <input 
                        id="gradeInput"
                        type="text" 
                        value={grade} 
                        onChange={(e) => setGrade(e.target.value)} 
                        className="grade-input"
                    />
                    <button className="grade-circle" onClick={startQuiz}>
                        Start Quiz
                    </button>
                </>
            )}
            {quizStarted && (
                <>
                    <div className="progress-container correct-container">
                        <div className="correct-bar" style={{ width: `${correctProgress}%` }}></div>
                        <span className="progress-text">{correctAnswers} Correct</span>
                    </div>
                    <div className="progress-container incorrect-container">
                        <div className="incorrect-bar" style={{ width: `${incorrectProgress}%` }}></div>
                        <span className="progress-text">{incorrectAnswers} Incorrect</span>
                    </div>
                    {currentQuestionIndex < questions.length ? (
                        <div>
                            <h2>{questions[currentQuestionIndex].question}</h2>
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <button key={index} onClick={() => handleAnswer(option)} className="option-button">
                                    {option}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <h2>Quiz Completed!</h2>
                            <p>You got {correctAnswers} out of {questions.length} right.</p>
                            <button onClick={handleOpenModal} className="signup-button">
                                Sign Up for More!
                            </button>
                        </div>
                    )}
                </>
            )}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <form>
                    <h2>Sign Up for a Free Session</h2>
                    <label>Student Name: <input type="text" name="studentName" /></label>
                    <label>Grade: <input type="text" name="grade" /></label>
                    <label>School: <input type="text" name="school" /></label>
                    <label>Phone Number: <input type="tel" name="phoneNumber" placeholder="123-456-7890" /></label>
                    <button type="submit" className="submit-button">Submit</button>

                </form>
            </Modal>
        </div>
    );
}

export default Hero;
