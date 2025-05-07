import React from 'react';
import './SmartMC.css';
import { SmartMCQuestion } from '../../types/Assessment';

type Props = {
  question: SmartMCQuestion;
  onAnswer: (choiceId: string, correct: boolean) => void;
  initialAnswer?: { choiceId: string; correct: boolean };
};

export const SmartMC: React.FC<Props> = ({ question, onAnswer, initialAnswer }) => {
  const [selected, setSelected] = React.useState<string | null>(initialAnswer?.choiceId || null);

  const handle = (id: string, correct: boolean) => {
    setSelected(id);
    // 300 ms delay so they see highlight
    setTimeout(() => onAnswer(id, correct), 300);
  };

  return (
    <div className="smart-mc">
      <h3>{question.prompt}</h3>
      <ul>
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
    </div>
  );
};
