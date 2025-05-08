import React from 'react';
import './ErrorAnalysis.css';
import { ErrorAnalysisQuestion } from '../../types/Assessment';
import { TypeAnimation } from '../TypeAnimation/TypeAnimation';

type Props = {
  question: ErrorAnalysisQuestion;
  onAnswer: (errorTypeId: string) => void;
  initialAnswer?: string;
};

export const ErrorAnalysis: React.FC<Props> = ({ question, onAnswer, initialAnswer }) => {
  // Initialize with existing answer if available
  const [chosen, setChosen] = React.useState<string | null>(initialAnswer || null);
  const [showContent, setShowContent] = React.useState<boolean>(initialAnswer ? true : false);

  // Check if workUrl is a color (starts with #) or an image URL
  const isColorValue = question.workUrl.startsWith('#');

  return (
    <div className="error-analysis">
      <TypeAnimation 
        text="Find the mistake"
        className="question-prompt"
        tag="h3"
        onComplete={() => setShowContent(true)}
      />
      
      {showContent && (
        <div className="analysis-content fade-in">
          {isColorValue ? (
            <div 
              className="work-placeholder" 
              style={{ backgroundColor: question.workUrl }}
            >
              Sample Problem With Error
            </div>
          ) : (
            <img src={question.workUrl} alt="worked example" />
          )}
          <div className="choices">
            {question.errorTypes.map(e => (
              <button
                key={e.id}
                className={chosen === e.id ? 'selected' : ''}
                onClick={() => {
                  setChosen(e.id);
                  setTimeout(() => onAnswer(e.id), 300);
                }}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 