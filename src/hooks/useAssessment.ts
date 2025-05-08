import React from 'react';
import { Question } from '../types/Assessment';

// Define types for the components to resolve the import errors
type SmartMCProps = {
  question: any;
  onAnswer: (choiceId: string, correct: boolean) => void;
};

type MicroTaskProps = {
  question: any;
  onAnswer: (payload: any) => void;
};

type ReasonChoiceProps = {
  question: any;
  onAnswer: (optionId: string) => void;
};

type ErrorAnalysisProps = {
  question: any;
  onAnswer: (errorTypeId: string) => void;
};

// Mock component factories for type safety
const SmartMC = (props: SmartMCProps) => null;
const MicroTask = (props: MicroTaskProps) => null;
const ReasonChoice = (props: ReasonChoiceProps) => null;
const ErrorAnalysis = (props: ErrorAnalysisProps) => null;

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
        return React.createElement(SmartMC, {
          question: q,
          onAnswer: (choiceId: string, correct: boolean) => handleAnswer(q.id, { choiceId, correct })
        });
      case 'microTask':
        return React.createElement(MicroTask, {
          question: q,
          onAnswer: (payload: any) => handleAnswer(q.id, payload)
        });
      case 'reasonChoice':
        return React.createElement(ReasonChoice, {
          question: q,
          onAnswer: (optionId: string) => handleAnswer(q.id, optionId)
        });
      case 'errorAnalysis':
        return React.createElement(ErrorAnalysis, {
          question: q,
          onAnswer: (errorTypeId: string) => handleAnswer(q.id, errorTypeId)
        });
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
