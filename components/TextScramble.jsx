'use client';
import { useEffect, useState, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#____$%!@841256';

export default function TextScramble({ text, className = '', speed = 25 }) {
  const [displayText, setDisplayText] = useState(text);
  const [isTriggered, setIsTriggered] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isTriggered) {
          setIsTriggered(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [isTriggered]);

  useEffect(() => {
    if (!isTriggered) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [isTriggered, text, speed]);

  return (
    <span ref={elementRef} className={className}>
      {displayText}
    </span>
  );
}
