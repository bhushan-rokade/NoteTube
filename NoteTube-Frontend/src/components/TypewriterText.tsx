import React, { useEffect, useState } from 'react';
import MarkDownViewer from './MarkDownViewer';

interface TypewriterProps {
  text: string;
  speed?: number;
  onDone?: () => void;
}

const TypewriterText: React.FC<TypewriterProps> = ({
  text,
  speed = 30,
  onDone,
}) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length - 1) {
        setDisplayedText((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
        onDone?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return <MarkDownViewer content={displayedText} />;
};

export default TypewriterText;
