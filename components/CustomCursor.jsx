'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;
    setIsVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverStart = (e) => {
      if (e.target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovered(true);
      }
    };

    const handleHoverEnd = (e) => {
      if (e.target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-blue-400 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-blue-500/40 pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0)',
          borderColor: isHovered ? 'rgba(96, 165, 250, 0.8)' : 'rgba(59, 130, 246, 0.3)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250 }}
      />
    </>
  );
}
