import React from 'react';
import { Question } from '../types/Assessment';
import { SmartMC } from '../components/SmartMC/SmartMC';
import { MicroTask } from '../components/MicroTask/MicroTask';
import { ErrorAnalysis } from '../components/ErrorAnalysis/ErrorAnalysis';

// ReasonChoice component is referenced but needs to be implemented
// Import it if it exists or create it later
import { ReasonChoice } from '../components/ReasonChoice/ReasonChoice';

export function useAssessment() {
  const [currentQuestion, setCurrentQuestion] = React.useState<Question | null>(null);
  const [answers, setAnswers] = React.useState<Record<string, any>>({});

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const renderQuestion = (q: Question) => {
    if (!q) return null;
    
    switch (q.type) {
      case 'smartMC':
        return <SmartMC 
          question={q} 
          onAnswer={(choiceId, correct) => handleAnswer(q.id, { choiceId, correct })} 
        />;
      case 'microTask':
        return <MicroTask 
          question={q} 
          onAnswer={(payload) => handleAnswer(q.id, payload)} 
        />;
      case 'reasonChoice':
        return <ReasonChoice 
          question={q} 
          onAnswer={(optionId) => handleAnswer(q.id, optionId)} 
        />;
      case 'errorAnalysis':
        return <ErrorAnalysis 
          question={q} 
          onAnswer={(errorTypeId) => handleAnswer(q.id, errorTypeId)} 
        />;
      default:
        return null;
    }
  };

  return {
    currentQuestion,
    setCurrentQuestion,
    answers,
    renderQuestion
  };
} 