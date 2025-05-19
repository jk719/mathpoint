import React, { useState, useEffect } from 'react';
import './OpenEnded.css';

interface OpenEndedQuestionProps {
  id: string;
  prompt: string;
  type: string;
}

interface OpenEndedProps {
  question: OpenEndedQuestionProps;
  onAnswer: (text: string) => void;
  initialAnswer?: string;
}

const OpenEnded: React.FC<OpenEndedProps> = ({ question, onAnswer, initialAnswer }) => {
  const [answer, setAnswer] = useState(initialAnswer || '');

  useEffect(() => {
    if (initialAnswer) {
      setAnswer(initialAnswer);
    } else {
      // Important: Reset the answer when navigating to a different question
      setAnswer('');
    }
  }, [initialAnswer, question.id]); // Also respond to question ID changes

  const handleSubmit = () => {
    if (answer.trim()) {
      onAnswer(answer);
    }
  };

  return (
    <div className="open-ended-container">
      <div className="open-ended-prompt">
        <h3>{question.prompt}</h3>
      </div>
      <div className="open-ended-response">
        <textarea 
          rows={5} 
          placeholder="Type your explanation here..." 
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="open-ended-textarea"
        />
      </div>
      <div className="open-ended-submit">
        <button 
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className="submit-button"
        >
          Submit Response
        </button>
      </div>
    </div>
  );
};

export default OpenEnded;
