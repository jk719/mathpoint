import React, { useState, useEffect, ElementType } from 'react';
import './TypeAnimation.css';

interface TypeAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const TypeAnimation: React.FC<TypeAnimationProps> = ({
  text = '',
  className = '',
  speed = 40,
  delay = 200,
  onComplete,
  tag = 'div'
}) => {
  // Set full text immediately but with opacity 0, for accessibility and to avoid layout shifts
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  // Reset when text prop changes
  useEffect(() => {
    // Validate and clean the text right away
    if (typeof text !== 'string') {
      console.error('TypeAnimation received non-string text:', text);
      setDisplayText(String(text || ''));
      setIsComplete(true);
      return;
    }
    
    // Only reset if text actually changed
    const cleanText = String(text).trim();
    if (cleanText !== displayText) {
      setDisplayText('');
      setIsComplete(false);
    }
  }, [text]);
  
  // Handle the typing animation
  useEffect(() => {
    if (isComplete || !text) return;
    
    let index = 0;
    // Ensure we're working with a string
    const cleanText = String(text).trim();
    
    // Initial delay before starting to type
    const startTimer = setTimeout(() => {
      // Typing interval
      const intervalId = setInterval(() => {
        if (index < cleanText.length) {
          setDisplayText(() => cleanText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(intervalId);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }, speed);
      
      return () => clearInterval(intervalId);
    }, delay);
    
    return () => clearTimeout(startTimer);
  }, [text, speed, delay, onComplete, isComplete]);
  
  // Skip animation on click
  const skipAnimation = () => {
    if (!isComplete && text) {
      const cleanText = String(text).trim();
      setDisplayText(cleanText);
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  };
  
  // Render the component using the specified tag
  const Component = tag as ElementType;
  
  return (
    <Component className={`type-animation ${className}`} onClick={skipAnimation}>
      {displayText}
      {!isComplete && <span className="cursor">|</span>}
    </Component>
  );
}; 