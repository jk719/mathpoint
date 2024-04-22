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
    const [errorMessage, setErrorMessage] = useState('');
    const [quizComplete, setQuizComplete] = useState(false);  // State to track if the quiz is completed
    

    const startQuiz = () => {
        const gradeNum = parseInt(grade, 10);
        if (!isNaN(gradeNum) && gradeNum >= 1 && gradeNum <= 12) {
            setQuestions(getQuestionsForGrade(gradeNum));
            setQuizStarted(true);
            setCurrentQuestionIndex(0);
            setCorrectAnswers(0);
            setIncorrectAnswers(0);
            setQuizComplete(false);  // Reset quiz completion status
            setErrorMessage('');
        } else {
            setErrorMessage('Please enter a grade between 1 and 12.');
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
            setQuizComplete(true);  // Set quiz completion status to true
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const restartQuiz = () => {
        setQuizComplete(false);
        setQuizStarted(false);
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setGrade('');
    };

    const correctProgress = (correctAnswers / questions.length) * 100;
    const incorrectProgress = (incorrectAnswers / questions.length) * 100;

    return (
        <div className="hero">
            {!quizStarted && !quizComplete && (
                <div className="grade-input-container">
                    <label htmlFor="gradeInput" className="grade-label">
                        {errorMessage || "Enter your grade:"}
                    </label>
                    <input 
                        id="gradeInput"
                        type="number"
                        value={grade} 
                        onChange={(e) => setGrade(e.target.value)} 
                        className="grade-input"
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
                    <div className="question-section">
                        <h2 className="question-text">{questions[currentQuestionIndex].question}</h2>
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <button key={index} onClick={() => handleAnswer(option)} className="option-button">
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}
            {quizComplete && (
                <div className="grade-input-container">
                    <h2 className="question-text">Quiz Completed! You scored {correctAnswers} out of {questions.length}.</h2>
                    <button className="grade-circle" onClick={restartQuiz}>
                        Restart Quiz
                    </button>
                </div>
            )}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
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
            </Modal>
        </div>
    );
}

export default Hero;
