import React from 'react';
import './ErrorAnalysis.css';
import { ErrorAnalysisQuestion } from '../../types/Assessment';

type Props = {
  question: ErrorAnalysisQuestion;
  onAnswer: (errorTypeId: string) => void;
  initialAnswer?: string;
};

export const ErrorAnalysis: React.FC<Props> = ({ question, onAnswer, initialAnswer }) => {
  const [chosen, setChosen] = React.useState<string | null>(initialAnswer || null);

  const isColorValue = question.workUrl.startsWith('#');

  return (
    <div className="error-analysis">
      <h3>Find the mistake</h3>
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
  );
};
