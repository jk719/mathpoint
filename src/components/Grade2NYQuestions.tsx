import React, { useState, useEffect, useRef } from 'react';
import './Grade2NYQuestions.css';
import { Question, SmartMCQuestion, ReasonChoiceQuestion } from '../types/Assessment';
import { SmartMC } from './SmartMC/SmartMC';
import { ReasonChoice } from './ReasonChoice/ReasonChoice';
import OpenEnded from './OpenEnded/OpenEnded';
import { getFormattedNYGrade2Questions } from './questions-grade2-ny';

// Helper function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]; // Create a copy to avoid modifying the original
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }
  return newArray;
}

// MathPoint-themed streak messages with number words
const STREAK_MESSAGES = [
  '', // 0 streak
  '', // 1 streak (doesn't show)
  'DOUBLE CORRECT!', // 2 streak
  'TRIPLE CORRECT!', // 3 streak
  'QUADRUPLE CORRECT!', // 4 streak
  'QUINTUPLE CORRECT!', // 5 streak
  'SEXTUPLE CORRECT!', // 6 streak
  'SEPTUPLE CORRECT!', // 7 streak
  'OCTUPLE CORRECT!', // 8 streak
  'INCREDIBLE STREAK!', // 9+ streak
];

// Cool mathematical icons for MathPoint theme
const STREAK_ICONS = [
  '',
  '',
  '🎯', // 2 streak
  '🔥', // 3 streak
  '⚡', // 4 streak
  '🌟', // 5 streak
  '💎', // 6 streak
  '🚀', // 7 streak
  '👑', // 8 streak
  '🏆', // 9+ streak
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
    // For multiple choice questions (q.type is 'multiple-choice' here)
    // The 'Question' type from getFormattedNYGrade2Questions for multiple-choice
    // has 'options' and 'correctIndex'.
    const mcQuestion = q as Extract<typeof q, { type: 'multiple-choice' }>; // Type assertion

    const correctAnswerLabel = mcQuestion.options[mcQuestion.correctIndex];
    const shuffledOptions = shuffleArray(mcQuestion.options);

    return {
      id: mcQuestion.id,
      type: 'smartMC',
      prompt: mcQuestion.prompt,
      choices: shuffledOptions.map((option, idx) => ({
        id: String.fromCharCode(97 + idx), // a, b, c, d...
        label: option,
        isCorrect: option === correctAnswerLabel
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
  console.log('Grade2NYQuestions component rendering'); // TEST CONSOLE LOG
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isChanging, setIsChanging] = useState(false);
  const [stats, setStats] = useState<Stats>({ correct: 0, incorrect: 0, streak: 0, total: 0 });
  const [showStreak, setShowStreak] = useState(false);
  const [streakMessage, setStreakMessage] = useState('');
  const [streakIcon, setStreakIcon] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const questionContainerRef = useRef<HTMLDivElement>(null);

  const currentQuestion = questionBank[currentIndex];

  const startAssessment = () => {
    setHasStarted(true);
  };

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
          const streakLevel = newStats.streak >= STREAK_MESSAGES.length 
            ? STREAK_MESSAGES.length - 1 
            : newStats.streak;
          setStreakMessage(STREAK_MESSAGES[streakLevel]);
          setStreakIcon(STREAK_ICONS[streakLevel]);
          setShowStreak(true);
          
          // Hide streak message after 2.5 seconds
          setTimeout(() => {
            setShowStreak(false);
          }, 2500);
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
        key={currentQuestion.id} // Add key prop
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
          key={currentQuestion.id} // Add key prop
          question={currentQuestion} 
          onAnswer={(choiceId, correct) => handleAnswer(currentQuestion.id, { choiceId, correct })} 
          initialAnswer={existingAnswer}
        />;
      case 'reasonChoice':
        return <ReasonChoice 
          key={currentQuestion.id} // Add key prop
          question={currentQuestion} 
          onAnswer={(optionId) => handleAnswer(currentQuestion.id, optionId)} 
          initialAnswer={existingAnswer}
        />;
      default:
        return null;
    }
  };

  // Show start screen if assessment hasn't started
  if (!hasStarted) {
    return (
      <div className="question-demo mathpoint-theme">
        <div className="assessment-start-screen">
          <div className="start-header">
            <span className="start-icon">🧮</span>
            <h2 className="start-title">MathPoint Assessment</h2>
            <span className="start-icon">🎯</span>
          </div>
          <div className="start-content">
            <h3 className="start-subtitle">Ready to Test Your Math Skills?</h3>
            <p className="start-description">
              This assessment contains <strong>{questionBank.length} questions</strong> covering various mathematical concepts. 
              Take your time and do your best!
            </p>
            <div className="start-features">
              <div className="start-feature">
                <span className="feature-icon">⚡</span>
                <span>Track your streak</span>
              </div>
              <div className="start-feature">
                <span className="feature-icon">📊</span>
                <span>Real-time progress</span>
              </div>
              <div className="start-feature">
                <span className="feature-icon">🎯</span>
                <span>Instant feedback</span>
              </div>
            </div>
            <button className="start-assessment-btn" onClick={startAssessment}>
              🚀 Start Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="question-demo mathpoint-theme">
      <div className="question-header">
        <span className="math-icon">🧮</span>
        <p className="question-count">MathPoint Assessment - Question {currentIndex + 1} of {questionBank.length}</p>
        <span className="formula-icon">🎯</span>
      </div>
      
      {/* Modern Stats Dashboard */}
      <div className="stats-dashboard">
        <div className="stat-card stat-correct">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <div className="stat-value">{stats.correct}</div>
            <div className="stat-label">Correct</div>
          </div>
        </div>
        <div className="stat-card stat-streak">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <div className="stat-value">{stats.streak}</div>
            <div className="stat-label">Streak</div>
          </div>
        </div>
        <div className="stat-card stat-incorrect">
          <div className="stat-icon">✗</div>
          <div className="stat-content">
            <div className="stat-value">{stats.incorrect}</div>
            <div className="stat-label">Missed</div>
          </div>
        </div>
        <div className="stat-card stat-total">
          <div className="stat-icon">#</div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total</div>
          </div>
        </div>
      </div>
      
      <div className="progress-container">
        <div className="progress-bars">
          <div className="progress-track">
            <div className="progress-header">
              <span className="progress-label">✅ Correct</span>
              <span className="progress-count">{stats.correct}</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar progress-correct"
                style={{ width: `${Math.min(100, (stats.correct / 20) * 100)}%` }}
              />
            </div>
          </div>
          <div className="progress-track">
            <div className="progress-header">
              <span className="progress-label">❌ Incorrect</span>
              <span className="progress-count">{stats.incorrect}</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar progress-incorrect"
                style={{ width: `${Math.min(100, (stats.incorrect / 20) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Modern Streak Achievement */}
      {showStreak && (
        <div className="streak-overlay">
          <div className="mathpoint-achievement">
            <div className="achievement-header">
              <div className="achievement-badge">{streakIcon}</div>
              <div className="achievement-title">Streak Achievement!</div>
            </div>
            <div className="achievement-message">{streakMessage}</div>
            <div className="achievement-subtitle">Keep up the excellent work!</div>
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
          <span className="button-icon">←</span> Previous
        </button>
        <button 
          onClick={() => changeQuestion(Math.min(questionBank.length - 1, currentIndex + 1))}
          disabled={currentIndex === questionBank.length - 1}
          className="nav-button next-button"
        >
          Next <span className="button-icon">→</span>
        </button>
      </div>
    </div>
  );
};
