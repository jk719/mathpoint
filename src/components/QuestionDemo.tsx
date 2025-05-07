import React, { useState } from 'react';
import './QuestionDemo.css';
import { Question, SmartMCQuestion, MicroTaskQuestion, ReasonChoiceQuestion, ErrorAnalysisQuestion } from '../types/Assessment';
import { SmartMC } from './SmartMC/SmartMC';
import { MicroTask } from './MicroTask/MicroTask';
import { ReasonChoice } from './ReasonChoice/ReasonChoice';
import { ErrorAnalysis } from './ErrorAnalysis/ErrorAnalysis';

// Sample questions for demo
const demoQuestions: Question[] = [
  {
    id: 'q1',
    type: 'smartMC',
    prompt: 'What is the value of x in the equation 2x + 5 = 13?',
    choices: [
      { id: 'a', label: 'x = 3', isCorrect: false },
      { id: 'b', label: 'x = 4', isCorrect: true },
      { id: 'c', label: 'x = 5', isCorrect: false },
      { id: 'd', label: 'x = 6', isCorrect: false },
    ]
  } as SmartMCQuestion,
  {
    id: 'q2',
    type: 'microTask',
    prompt: 'Plot the coordinates (3,4) on the grid',
    canvas: null
  } as MicroTaskQuestion,
  {
    id: 'q3',
    type: 'reasonChoice',
    prompt: 'How confident are you in solving linear equations?',
    options: [
      { id: 'low', icon: '😕', label: 'Not confident' },
      { id: 'medium', icon: '🤔', label: 'Somewhat confident' },
      { id: 'high', icon: '😊', label: 'Very confident' },
      { id: 'expert', icon: '🎓', label: 'Expert level' }
    ]
  } as ReasonChoiceQuestion,
  {
    id: 'q4',
    type: 'errorAnalysis',
    workUrl: '#eee',
    errorTypes: [
      { id: 'calc', label: 'Calculation Error' },
      { id: 'concept', label: 'Concept Misunderstanding' },
      { id: 'notation', label: 'Notation Error' },
      { id: 'logic', label: 'Logic Error' }
    ]
  } as ErrorAnalysisQuestion
];

export const QuestionDemo: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const currentQuestion = demoQuestions[currentIndex];

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentIndex < demoQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 800);
  };

  // Render the current question
  const renderCurrentQuestion = () => {
    if (!currentQuestion) return null;
    
    // Get any existing answer for this question
    const existingAnswer = answers[currentQuestion.id];
    
    switch (currentQuestion.type) {
      case 'smartMC':
        return <SmartMC 
          question={currentQuestion} 
          onAnswer={(choiceId, correct) => handleAnswer(currentQuestion.id, { choiceId, correct })} 
          initialAnswer={existingAnswer}
        />;
      case 'microTask':
        return <MicroTask 
          question={currentQuestion} 
          onAnswer={(payload) => handleAnswer(currentQuestion.id, payload)} 
          initialAnswer={existingAnswer}
        />;
      case 'reasonChoice':
        return <ReasonChoice 
          question={currentQuestion} 
          onAnswer={(optionId) => handleAnswer(currentQuestion.id, optionId)} 
          initialAnswer={existingAnswer}
        />;
      case 'errorAnalysis':
        return <ErrorAnalysis 
          question={currentQuestion} 
          onAnswer={(errorTypeId) => handleAnswer(currentQuestion.id, errorTypeId)} 
          initialAnswer={existingAnswer}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="question-demo">
      <h2>Assessment Demo</h2>
      <p>Question {currentIndex + 1} of {demoQuestions.length}</p>
      
      <div className="question-container">
        {renderCurrentQuestion()}
      </div>
      
      <div className="navigation">
        <button 
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="nav-button"
        >
          Previous
        </button>
        <button 
          onClick={() => setCurrentIndex(Math.min(demoQuestions.length - 1, currentIndex + 1))}
          disabled={currentIndex === demoQuestions.length - 1}
          className="nav-button"
        >
          Next
        </button>
      </div>
      
      <div className="debug">
        <h3>Debug: Collected Answers</h3>
        <pre>{JSON.stringify(answers, null, 2)}</pre>
      </div>
    </div>
  );
}; 