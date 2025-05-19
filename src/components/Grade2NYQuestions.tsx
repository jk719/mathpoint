import React, { useState, useEffect, useRef } from 'react';
import './Grade2NYQuestions.css';
import { Question, SmartMCQuestion, ReasonChoiceQuestion } from '../types/Assessment';
import { SmartMC } from './SmartMC/SmartMC';
import { ReasonChoice } from './ReasonChoice/ReasonChoice';
import OpenEnded from './OpenEnded/OpenEnded';
import { getFormattedNYGrade2Questions } from './questions-grade2-ny';

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

// Convert NY Grade 2 questions to application format
const nyQuestions = getFormattedNYGrade2Questions();

// Transform the questions to the application's question types
const questionBank: Question[] = nyQuestions.map(q => {
  if (q.type === 'open-ended') {
    // For the single open-ended question
    return {
      id: q.id,
      type: 'reasonChoice', // Using reasonChoice for open-ended as it's closest available type
      prompt: q.prompt,
      options: [
        { id: 'simple', icon: '📝', label: 'Simple explanation' },
        { id: 'detailed', icon: '✏️', label: 'Detailed explanation' },
        { id: 'visual', icon: '👁️', label: 'Visual explanation' }
      ]
    } as ReasonChoiceQuestion;
  } else {
    // For multiple choice questions
    return {
      id: q.id,
      type: 'smartMC',
      prompt: q.prompt,
      choices: q.options.map((option, idx) => ({
        id: String.fromCharCode(97 + idx), // a, b, c, d...
        label: option,
        isCorrect: idx === q.correctIndex
      }))
    } as SmartMCQuestion;
  }
});

// Track stats for the assessment
interface Stats {
  correct: number;
  incorrect: number;
  streak: number;
  total: number;
}

export const Grade2NYQuestions: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isChanging, setIsChanging] = useState(false);
  const [stats, setStats] = useState<Stats>({ correct: 0, incorrect: 0, streak: 0, total: 0 });
  const [showStreak, setShowStreak] = useState(false);
  const [streakMessage, setStreakMessage] = useState('');
  const [streakIcon, setStreakIcon] = useState('');
  const questionContainerRef = useRef<HTMLDivElement>(null);

  const currentQuestion = questionBank[currentIndex];

  // Scroll to question container on initial load
  useEffect(() => {
    // Disable initial auto-scrolling completely
    // This will keep the header visible when the page first loads
  }, []);

  // Keep the animation/scrolling for question changes only
  const changeQuestion = (newIndex: number) => {
    setIsChanging(true);
    setTimeout(() => {
      // Reset answer for the question we're about to show
      const nextQuestionId = questionBank[newIndex]?.id;
      if (nextQuestionId) {
        // Create a new answers object without the next question's answer
        setAnswers(prev => {
          const newAnswers = { ...prev };
          delete newAnswers[nextQuestionId]; // Remove the answer for the next question
          return newAnswers;
        });
      }
      
      setCurrentIndex(newIndex);
      setIsChanging(false);
      
      // Scroll to the question container when changing questions
      setTimeout(() => {
        const questionElement = questionContainerRef.current;
        if (questionElement) {
          // Use gentler scrolling that respects the header and works on mobile
          const headerHeight = document.querySelector('.mathpoint-header')?.clientHeight || 70;
          const tabsHeight = document.querySelector('.app-tabs')?.clientHeight || 50;
          
          // On mobile, we want minimal scrolling since we're already filling the viewport
          const isMobile = window.innerWidth <= 480;
          
          if (isMobile) {
            // On mobile, just focus the element without scrolling the page
            questionElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          } else {
            // On desktop/tablet, scroll with offset for header
            const offset = Math.max(0, questionElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20);
            window.scrollTo({
              top: offset,
              behavior: 'smooth'
            });
          }
        }
      }, 50);
    }, 300);
  };

  const handleAnswer = (questionId: string, answer: any) => {
    // Update the answers state with the new answer
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
    
    // For SmartMC questions, update the stats
    // For now, we only track stats for smartMC questions with clear right/wrong
    let isCorrect = false;
    const question = questionBank.find(q => q.id === questionId);
    if (question && question.type === 'smartMC' && answer.correct) {
      isCorrect = true;
    }
    
    // Update stats based on correct/incorrect
    setStats(prevStats => {
      const newStats = { ...prevStats };
      newStats.total = prevStats.total + 1;
      
      if (isCorrect) {
        newStats.correct = prevStats.correct + 1;
        newStats.streak = prevStats.streak + 1;
        
        // Show streak message for streak >= 2
        if (newStats.streak >= 2) {
          // Get appropriate message and icon based on streak level
          const streakLevel = Math.min(newStats.streak, STREAK_MESSAGES.length - 1);
          setStreakMessage(STREAK_MESSAGES[streakLevel]);
          setStreakIcon(STREAK_ICONS[streakLevel]);
          setShowStreak(true);
          
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
    if (currentIndex < questionBank.length - 1) {
      setTimeout(() => {
        changeQuestion(currentIndex + 1);
      }, 1200);
    }
  };
  
  const renderCurrentQuestion = () => {
    // Get any existing answer for this question
    const existingAnswer = answers[currentQuestion.id];
    const questionObj = nyQuestions.find(q => q.id === currentQuestion.id);
    
    // For open-ended questions in the original data
    if (questionObj && questionObj.type === 'open-ended') {
      return <OpenEnded
        question={{ 
          id: questionObj.id,
          prompt: questionObj.prompt,
          type: 'openEnded'
        }}
        onAnswer={(text: string) => handleAnswer(currentQuestion.id, text)}
        initialAnswer={existingAnswer}
      />;
    }

    // For mapped questions
    switch(currentQuestion.type) {
      case 'smartMC':
        return <SmartMC 
          question={currentQuestion} 
          onAnswer={(choiceId, correct) => handleAnswer(currentQuestion.id, { choiceId, correct })} 
          initialAnswer={existingAnswer}
        />;
      case 'reasonChoice':
        return <ReasonChoice 
          question={currentQuestion} 
          onAnswer={(optionId) => handleAnswer(currentQuestion.id, optionId)} 
          initialAnswer={existingAnswer}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="question-demo mathpoint-theme">
      <div className="question-header">
        <span className="math-icon">📚</span>
        <p className="question-count">Grade 2 NY Math - Question {currentIndex + 1} of {questionBank.length}</p>
        <span className="formula-icon">✏️</span>
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
          onClick={() => changeQuestion(Math.min(questionBank.length - 1, currentIndex + 1))}
          disabled={currentIndex === questionBank.length - 1}
          className="nav-button next-button"
        >
          Next <span className="button-icon">▶</span>
        </button>
      </div>
    </div>
  );
};
