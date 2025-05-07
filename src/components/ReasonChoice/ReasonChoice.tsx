import React from 'react';
import './ReasonChoice.css';
import { ReasonChoiceQuestion } from '../../types/Assessment';

type Props = {
  question: ReasonChoiceQuestion;
  onAnswer: (optionId: string) => void;
  initialAnswer?: string;
};

export const ReasonChoice: React.FC<Props> = ({ question, onAnswer, initialAnswer }) => {
  const [selected, setSelected] = React.useState<string | null>(initialAnswer || null);

  const handleSelect = (id: string) => {
    setSelected(id);
    // Add a small delay for UI feedback
    setTimeout(() => onAnswer(id), 300);
  };

  return (
    <div className="reason-choice">
      <h3>{question.prompt}</h3>
      <div className="options-grid">
        {question.options.map(option => (
          <button
            key={option.id}
            className={`option ${selected === option.id ? 'selected' : ''}`}
            onClick={() => handleSelect(option.id)}
          >
            <div className="option-icon">{option.icon}</div>
            <div className="option-label">{option.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}; 