import React, { useState } from 'react';
import './Hero.css';
import Modal from '../Modal/Modal';
import { getQuestionsForGrade } from './questions'; // Ensure this is correctly imported

function Hero() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [grade, setGrade] = useState('');
    const [questions, setQuestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // Added error message state

    const startQuiz = () => {
        const gradeNum = parseInt(grade, 10);
        if (!isNaN(gradeNum) && gradeNum >= 1 && gradeNum <= 12) {
            setQuestions(getQuestionsForGrade(gradeNum));
            setQuizStarted(true);
            setCurrentQuestionIndex(0);
            setCorrectAnswers(0);
            setIncorrectAnswers(0);
            setErrorMessage(''); // Clear any error message
        } else {
            setErrorMessage('Please enter a grade between 1 and 12.'); // Set error message
        }
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
            setCurrentQuestionIndex(prev => prev + 1);
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
                <div className="grade-input-container">
                    <label htmlFor="gradeInput" className="grade-label">
                        {errorMessage || "Enter your grade:"}
                    </label>
                    <input 
                        id="gradeInput"
                        type="number" // Ensuring input is numerical
                        value={grade} 
                        onChange={(e) => setGrade(e.target.value)} 
                        className="grade-input"
                        // placeholder="1-12" // Updated placeholder
                    />
                    <button className="grade-circle" onClick={startQuiz}>
                        Start Quiz
                    </button>
                </div>
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
                        <div className="question-section">
                            <h2 className="question-text">{questions[currentQuestionIndex].question}</h2>
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <button key={index} onClick={() => handleAnswer(option)} className="option-button">
                                    {option}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="quiz-complete-section">
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
