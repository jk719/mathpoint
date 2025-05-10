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

export interface AssessmentState {
  questions: Question[];
  currentQuestion: Question | null;
  currentIndex: number;
  answers: Record<string, any>;
  isComplete: boolean;
}

export interface AssessmentActions {
  next: () => void;
  previous: () => void;
  answer: (questionId: string, answer: any) => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface AssessmentHook {
  state: AssessmentState;
  actions: AssessmentActions;
}

/**
 * Hook for managing assessment state and navigation
 */
export function useAssessment(questions: Question[]): AssessmentHook {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, any>>({});
  
  // Calculate current question based on index
  const currentQuestion = questions.length > 0 ? questions[currentIndex] : null;
  
  // Check if assessment is complete
  const isComplete = React.useMemo(() => {
    return questions.length > 0 && 
           questions.every(q => Object.keys(answers).includes(q.id));
  }, [questions, answers]);
  
  // Move to the next question
  const next = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  // Move to the previous question
  const previous = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  // Jump to a specific question index
  const jumpTo = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  };
  
  // Record an answer for a question
  const answer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  // Reset the assessment
  const reset = () => {
    setCurrentIndex(0);
    setAnswers({});
  };
  
  return {
    state: {
      questions,
      currentQuestion,
      currentIndex,
      answers,
      isComplete
    },
    actions: {
      next,
      previous,
      answer,
      jumpTo,
      reset
    }
  };
}
