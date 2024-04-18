import React, { useState } from 'react';
import './Hero.css';
import Modal from '../Modal/Modal';  // This navigates up to the components directory and then into the Modal directory

const questions = [
    { id: 1, question: "What is 7 x 8?", options: ["54", "56", "49", "63"], answer: "56" },
    { id: 2, question: "What is the square root of 144?", options: ["12", "14", "16", "10"], answer: "12" },
    { id: 3, question: "What is 15% of 200?", options: ["30", "25", "50", "20"], answer: "30" },
    { id: 4, question: "What is the sum of angles in a triangle?", options: ["180", "360", "90", "270"], answer: "180" },
    { id: 5, question: "What is 9 + 10?", options: ["21", "19", "18", "20"], answer: "19" }
];

function Hero() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            setQuizStarted(false); // Optionally keep this if you want to hide the quiz UI after completion
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const correctProgress = (correctAnswers / questions.length) * 100;
    const incorrectProgress = (incorrectAnswers / questions.length) * 100;

    return (
        <div className="hero">
            {quizStarted ? (
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
            ) : (
                <button className="grade-circle" onClick={startQuiz}>
                    Start Quiz
                </button>
            )}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <form>
                    <h2>Sign Up for a Free Session</h2>
                    <label>Parent Name: <input type="text" name="parentName" /></label>
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
