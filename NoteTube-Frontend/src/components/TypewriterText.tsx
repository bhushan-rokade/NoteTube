import React, { useEffect, useState } from 'react';
import MarkDownViewer from './MarkDownViewer';
import { useRef } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedText]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        paddingRight: '1rem',
      }}>
      <MarkDownViewer content={displayedText} />
    </div>
  );
};

export default TypewriterText;
