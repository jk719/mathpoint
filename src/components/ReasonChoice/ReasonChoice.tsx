import React from 'react';
import './ReasonChoice.css';
import { ReasonChoiceQuestion } from '../../types/Assessment';
import { TypeAnimation } from '../TypeAnimation/TypeAnimation';

type Props = {
  question: ReasonChoiceQuestion;
  onAnswer: (optionId: string) => void;
  initialAnswer?: string;
};

export const ReasonChoice: React.FC<Props> = ({ question, onAnswer, initialAnswer }) => {
  const [selected, setSelected] = React.useState<string | null>(initialAnswer || null);
  const [showOptions, setShowOptions] = React.useState<boolean>(initialAnswer ? true : false);

  const handleSelect = (id: string) => {
    setSelected(id);
    // Add a small delay for UI feedback
    setTimeout(() => onAnswer(id), 300);
  };

  // Ensure we have a valid prompt
  const prompt = typeof question.prompt === 'string' && question.prompt.trim() 
    ? question.prompt.trim() 
    : 'Select an option:';

  return (
    <div className="reason-choice">
      <TypeAnimation 
        text={prompt}
        className="question-prompt"
        tag="h3"
        onComplete={() => setShowOptions(true)}
      />
      
      {showOptions && (
        <div className="options-grid fade-in">
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
      )}
    </div>
  );
}; 