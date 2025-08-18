import { useState, useEffect } from 'react';
import './SmartMC.css';
import { SmartMCQuestion } from '../../types/Assessment';
import { TypeAnimation } from '../TypeAnimation/TypeAnimation';

interface SmartMCProps {
  question: SmartMCQuestion;
  onAnswer: (choiceId: string, correct: boolean) => void;
  initialAnswer?: { choiceId: string, correct: boolean };
}

export const SmartMC: React.FC<SmartMCProps> = ({ question, onAnswer, initialAnswer }) => {
  const [selected, setSelected] = useState<string | null>(initialAnswer?.choiceId || null);
  const [showChoices, setShowChoices] = useState(initialAnswer ? true : false);
  
  // Reset selected state when question changes or initialAnswer is cleared
  useEffect(() => {
    setSelected(initialAnswer?.choiceId || null);
    setShowChoices(initialAnswer ? true : false);
  }, [question.id, initialAnswer]);
  
  const handle = (id: string, correct: boolean) => {
    setSelected(id);
    // 300 ms delay so they see highlight
    setTimeout(() => onAnswer(id, correct), 300);
  };

  // Ensure we have a valid prompt
  const prompt = typeof question.prompt === 'string' && question.prompt.trim() 
    ? question.prompt.trim() 
    : 'Answer the following question:';

  return (
    <div className="smart-mc">
      <TypeAnimation 
        text={prompt}
        className="question-prompt"
        tag="h3"
        speed={50}
        onComplete={() => setShowChoices(true)}
      />
      
      {showChoices && (
        <ul className="choices-list fade-in">
          {question.choices.map(c => (
            <li
              key={c.id}
              className={
                selected === null
                  ? ''
                  : c.isCorrect
                  ? 'right'
                  : selected === c.id
                  ? 'wrong'
                  : ''
              }
              onClick={() => handle(c.id, c.isCorrect)}
            >
              {c.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 