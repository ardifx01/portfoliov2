'use client';
import { useState, useEffect, useRef } from 'react';

export default function AudioToggle() {
  const [enabled, setEnabled] = useState(false);
  const audioCtxRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
  };

  const playBeep = (freq = 440, type = 'sine', duration = 0.08) => {
    if (!enabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  const toggleSound = () => {
    initAudio();
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    const nextState = !enabled;
    setEnabled(nextState);
    if (nextState) playBeep(880, 'sine', 0.15);
  };

  useEffect(() => {
    const handleInteract = (e) => {
      const target = e.target.closest('a, button, [role="button"], .cursor-pointer');
      if (target && enabled) {
        playBeep(520, 'triangle', 0.05);
      }
    };
    window.addEventListener('mouseenter', handleInteract, true);
    return () => window.removeEventListener('mouseenter', handleInteract, true);
  }, [enabled]);

  return (
    <button
      onClick={toggleSound}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-blue-400/40 text-neutral-300 font-mono text-xs transition-all cursor-pointer"
    >
      <div className="flex gap-0.5 items-end h-3">
        <span className={`w-0.5 bg-blue-400 rounded-full transition-all ${enabled ? 'h-3 animate-pulse' : 'h-1 opacity-40'}`}></span>
        <span className={`w-0.5 bg-cyan-400 rounded-full transition-all ${enabled ? 'h-2 animate-bounce' : 'h-1 opacity-40'}`}></span>
        <span className={`w-0.5 bg-purple-400 rounded-full transition-all ${enabled ? 'h-3.5 animate-pulse' : 'h-1 opacity-40'}`}></span>
      </div>
      <span>SFX: {enabled ? 'ON' : 'OFF'}</span>
    </button>
  );
}