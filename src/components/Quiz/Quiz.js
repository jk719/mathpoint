import React, { useState } from 'react';

function Quiz({ questions }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const currentQuestion = questions[currentQuestionIndex];

    function handleAnswer(option) {
        setUserAnswers(prev => [...prev, option]);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert('Quiz completed. Check console for results.');
            console.log(userAnswers);
        }
    }

    return (
        <div>
            <h3>{currentQuestion.question}</h3>
            <ul>
                {currentQuestion.options.map((option, index) => (
                    <li key={index} onClick={() => handleAnswer(option)} style={{ cursor: 'pointer' }}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}
