import React from 'react';
import './MicroTask.css';
import { MicroTaskQuestion } from '../../types/Assessment';

/**
 * Generic micro-task template:
 *  - renders a canvas (image or grid)
 *  - lets user drag "tokens" onto canvas
 *  - on drop, report the positions
 *
 *  For now we keep it minimal; adapt per-task later.
 */
type Props = {
  question: MicroTaskQuestion;
  onAnswer: (payload: unknown) => void;
  initialAnswer?: unknown;
};

export const MicroTask: React.FC<Props> = ({ question, onAnswer, initialAnswer }) => {
  // initialAnswer is not used yet since this is just a placeholder component
  const [completed, setCompleted] = React.useState<boolean>(initialAnswer ? true : false);
  
  const handleClick = () => {
    setCompleted(true);
    onAnswer({ done: true });
  };
  
  return (
    <div 
      className={`micro-task ${completed ? 'completed' : ''}`} 
      onClick={completed ? undefined : handleClick}
    >
      <h3>{question.prompt}</h3>
      {question.canvas ? (
        <img src={question.canvas} alt="canvas" className="canvas" />
      ) : (
        <div className="grid-placeholder">[interactive grid]</div>
      )}
      <p className="hint">{completed ? 'Task completed' : '(click here to simulate completion)'}</p>
    </div>
  );
};
