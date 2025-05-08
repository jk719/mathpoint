import React, { useState, useEffect, useRef } from 'react';
import './QuestionDemo.css';
import { Question, SmartMCQuestion, ReasonChoiceQuestion, ErrorAnalysisQuestion } from '../types/Assessment';
import { SmartMC } from './SmartMC/SmartMC';
import { MicroTask } from './MicroTask/MicroTask';
import { ReasonChoice } from './ReasonChoice/ReasonChoice';
import { ErrorAnalysis } from './ErrorAnalysis/ErrorAnalysis';

// MathPoint-themed streak messages
const STREAK_MESSAGES = [
  '', // 0 streak
  '', // 1 streak (doesn't show)
  'DOUBLE CORRECT!', // 2 streak
  'GREAT PROGRESS!', // 3 streak
  'MATH GENIUS!', // 4 streak
  'BRILLIANT MIND!', // 5 streak
  'PERFECT STREAK!', // 6 streak
  'MATH MASTER!', // 7+ streak
];

// Achievement icons matching streak levels
const STREAK_ICONS = [
  '',
  '',
  '✓✓', // 2 streak
  '🔢', // numbers - 3 streak
  '🧠', // brain - 4 streak
  '💡', // idea - 5 streak
  '🏅', // medal - 6 streak
  '🔱', // achievement - 7+ streak
];

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
    type: 'smartMC',
    prompt: 'Which of these is a prime number?',
    choices: [
      { id: 'a', label: '15', isCorrect: false },
      { id: 'b', label: '21', isCorrect: false },
      { id: 'c', label: '29', isCorrect: true },
      { id: 'd', label: '33', isCorrect: false },
    ]
  } as SmartMCQuestion,
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

// Track stats for the assessment
interface Stats {
  correct: number;
  incorrect: number;
  streak: number;
  total: number;
}

export const QuestionDemo: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isChanging, setIsChanging] = useState(false);
  const [stats, setStats] = useState<Stats>({ correct: 0, incorrect: 0, streak: 0, total: 0 });
  const [showStreak, setShowStreak] = useState(false);
  const [streakMessage, setStreakMessage] = useState('');
  const [streakIcon, setStreakIcon] = useState('');
  const questionContainerRef = useRef<HTMLDivElement>(null);

  const currentQuestion = demoQuestions[currentIndex];

  // Scroll to question container on initial load
  useEffect(() => {
    // Disable initial auto-scrolling completely
    // This will keep the header visible when the page first loads
  }, []);

  // Keep the animation/scrolling for question changes only
  const changeQuestion = (newIndex: number) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsChanging(false);
      // Scroll to the question container when changing questions
      setTimeout(() => {
        const questionElement = questionContainerRef.current;
        if (questionElement) {
          // Use gentler scrolling that respects the header
          const headerHeight = document.querySelector('.mathpoint-header')?.clientHeight || 100;
          const offset = Math.max(0, questionElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20);
          window.scrollTo({
            top: offset,
            behavior: 'smooth'
          });
        }
      }, 100);
    }, 300);
  };

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Update stats based on correctness
    let isCorrect = false;
    
    // Determine if the answer is correct based on question type
    if (currentQuestion.type === 'smartMC' && answer.correct) {
      isCorrect = true;
    } else if (currentQuestion.type === 'errorAnalysis') {
      // For simplicity, let's consider the first error type as correct for demo
      isCorrect = answer === 'calc';
    }
    
    // Update stats
    setStats(prevStats => {
      const newStats = { 
        ...prevStats,
        total: prevStats.total + 1
      };
      
      if (isCorrect) {
        newStats.correct = prevStats.correct + 1;
        newStats.streak = prevStats.streak + 1;
        
        // Show streak animation for 2+ correct answers in a row
        if (newStats.streak >= 2) {
          const messageIndex = Math.min(newStats.streak, STREAK_MESSAGES.length - 1);
          setStreakMessage(STREAK_MESSAGES[messageIndex]);
          setStreakIcon(STREAK_ICONS[messageIndex]);
          setShowStreak(true);
          
          // Play achievement sound
          const audio = new Audio('/success.mp3');
          audio.volume = 0.3;
          audio.play().catch(e => console.log('Audio play failed:', e));
          
          // Hide streak message after 2 seconds
          setTimeout(() => {
            setShowStreak(false);
          }, 2000);
        }
      } else {
        newStats.incorrect = prevStats.incorrect + 1;
        newStats.streak = 0; // Reset streak on wrong answer
      }
      
      return newStats;
    });
    
    // Auto-advance to next question after a delay if not the last question
    if (currentIndex < demoQuestions.length - 1) {
      setTimeout(() => {
        changeQuestion(currentIndex + 1);
      }, 1200);
    }
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
    <div className="question-demo mathpoint-theme">
      <div className="question-header">
        <span className="math-icon">📊</span>
        <p className="question-count">Question {currentIndex + 1} of {demoQuestions.length}</p>
        <span className="formula-icon">📐</span>
      </div>
      
      {/* Progress bars */}
      <div className="progress-container">
        <div className="progress-stats">
          <div className="stat">
            <span className="stat-icon">💚</span>
            <span className="stat-label">Correct</span>
            <span className="stat-value">{stats.correct}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">🔥</span>
            <span className="stat-label">Streak</span>
            <span className="stat-value">{stats.streak}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">❌</span>
            <span className="stat-label">Incorrect</span>
            <span className="stat-value">{stats.incorrect}</span>
          </div>
        </div>
        
        <div className="progress-bars">
          <div className="progress-bar-container">
            <div 
              className="progress-bar progress-correct" 
              style={{ width: `${stats.total ? (stats.correct / stats.total) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar progress-incorrect" 
              style={{ width: `${stats.total ? (stats.incorrect / stats.total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Streak animation */}
      {showStreak && (
        <div className="streak-animation">
          <div className="achievement-box">
            <div className="achievement-icon">{streakIcon}</div>
            <div className="achievement-text">
              <div className="achievement-title">Achievement Unlocked!</div>
              <div className="achievement-message">{streakMessage}</div>
            </div>
          </div>
        </div>
      )}
      
      <div className={`question-container ${isChanging ? 'fade-out' : 'fade-in'}`} ref={questionContainerRef}>
        {renderCurrentQuestion()}
      </div>
      
      <div className="navigation">
        <button 
          onClick={() => changeQuestion(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="nav-button prev-button"
        >
          <span className="button-icon">◀</span> Previous
        </button>
        <button 
          onClick={() => changeQuestion(Math.min(demoQuestions.length - 1, currentIndex + 1))}
          disabled={currentIndex === demoQuestions.length - 1}
          className="nav-button next-button"
        >
          Next <span className="button-icon">▶</span>
        </button>
      </div>
      
      <div className="debug">
        <h3>📊 Debug: Collected Answers</h3>
        <pre>{JSON.stringify(answers, null, 2)}</pre>
      </div>
    </div>
  );
}; 