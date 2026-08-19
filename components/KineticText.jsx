'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GLITCH_CHARS = '!/\\\\_[]{}—=+*^?#01';

export default function KineticText({ text = "MNKDIGITAL", className = "" }) {
  const letters = text.split("");
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className={`relative inline-flex flex-wrap justify-center items-center select-none ${className}`}
      style={{
        perspective: 1000,
        transform: `rotateX(${-mouseOffset.y * 0.8}deg) rotateY(${mouseOffset.x * 0.8}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
    >
      {letters.map((char, index) => (
        <LetterBlock key={index} char={char} index={index} />
      ))}
    </motion.div>
  );
}

function LetterBlock({ char, index }) {
  const [displayChar, setDisplayChar] = useState(char);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setIsGlitching(true);
        setDisplayChar(GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]);
        setTimeout(() => {
          setDisplayChar(char);
          setIsGlitching(false);
        }, 120);
      }
    }, 2000 + index * 400);

    return () => clearInterval(interval);
  }, [char, index]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 40, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.1 + index * 0.06,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      whileHover={{
        y: -12,
        scale: 1.15,
        color: '#60a5fa',
        transition: { duration: 0.2 }
      }}
      className={`inline-block font-black tracking-wider transition-colors duration-150 cursor-pointer ${
        isGlitching ? 'text-cyan-400 scale-105' : 'text-white'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {displayChar}
    </motion.span>
  );
}