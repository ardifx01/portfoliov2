'use client';
import { useEffect } from 'react';
import { soundFx } from '../utils/audioFx';

export default function SoundProvider({ children }) {
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-sound="hover"]');
      if (target) soundFx.playHover();
    };

    const handleClick = (e) => {
      const target = e.target.closest('a, button, [data-sound="click"]');
      if (target) soundFx.playClick();
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return <>{children}</>;
}
