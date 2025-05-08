import React from 'react';
import './MicroTask.css';
import { MicroTaskQuestion } from '../../types/Assessment';
import { TypeAnimation } from '../TypeAnimation/TypeAnimation';

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
  const [showTask, setShowTask] = React.useState<boolean>(initialAnswer ? true : false);
  
  const handleClick = () => {
    setCompleted(true);
    onAnswer({ done: true });
  };
  
  // Ensure we have a valid prompt
  const prompt = typeof question.prompt === 'string' && question.prompt.trim() 
    ? question.prompt.trim() 
    : 'Complete the task:';
  
  return (
    <div 
      className={`micro-task ${completed ? 'completed' : ''}`} 
      onClick={completed ? undefined : handleClick}
    >
      <TypeAnimation 
        text={prompt}
        className="question-prompt"
        tag="h3"
        onComplete={() => setShowTask(true)}
      />
      
      {showTask && (
        <div className="task-content fade-in">
          {question.canvas ? (
            <img src={question.canvas} alt="canvas" className="canvas" />
          ) : (
            <div className="grid-placeholder">[interactive grid]</div>
          )}
          <p className="hint">{completed ? 'Task completed' : '(click here to simulate completion)'}</p>
        </div>
      )}
    </div>
  );
}; 