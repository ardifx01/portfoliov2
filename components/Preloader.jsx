'use client';
import { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/audioFx';

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>/?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const TARGET_TEXT = 'MNKDIGITAL';

const BOOT_LOGS = [
  'MOUNTING CORE SHADER PIPELINE...',
  'RESOLVING GRAPHQL TELEMETRY @ardifx01...',
  'CALCULATING PERSPECTIVE MATRIX BUFFERS...',
  'COMPILING GLSL MATERIAL FRAGMENTS...',
  'INITIALIZING SACRED GEOMETRY MESH...',
  'HARDENING VULNERABILITY RUNTIMES...',
  'SYNCHRONIZING SECURE WEBGL ENGINES...',
  'ALL SYSTEMS SYNCHRONIZED.'
];

// Komponen Teks Mandiri agar TIDAK memicu re-render seluruh layar SVG
const FastScrambleText = memo(function FastScrambleText({ progress }) {
  const [text, setText] = useState('!@#$%^&*()');

  useEffect(() => {
    if (progress >= 90) {
      setText(TARGET_TEXT);
      return;
    }

    const decodeRatio = Math.max(0, (progress - 10) / 80);
    const resolvedChars = Math.floor(decodeRatio * TARGET_TEXT.length);

    const randomized = TARGET_TEXT.split('')
      .map((char, idx) => {
        if (idx < resolvedChars) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join('');

    setText(randomized);
  }, [progress]);

  return (
    <div className="relative font-mono font-black text-3xl sm:text-5xl md:text-7xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white">
      {text}
    </div>
  );
});

export default function AlchePreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let startTime = null;
    let lastProgress = 0;
    let lastLog = 0;
    const TOTAL_DURATION = 3600; // Disesuaikan sedikit lebih snappy (3.6s)

    const updateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progressFraction = Math.min(elapsed / TOTAL_DURATION, 1);

      // Easing cubic yang mulus
      const currentVal = Math.floor(progressFraction * 100);

      // Throttling: Hanya re-render jika nilai integer bertambah
      if (currentVal !== lastProgress) {
        lastProgress = currentVal;
        setProgress(currentVal);

        const currentLog = Math.min(
          Math.floor(progressFraction * BOOT_LOGS.length),
          BOOT_LOGS.length - 1
        );
        if (currentLog !== lastLog) {
          lastLog = currentLog;
          setLogIndex(currentLog);
        }
      }

      if (progressFraction < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setProgress(100);
        try { soundFx?.playSuccess?.(); } catch (e) {}
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = 'auto';
          if (onComplete) onComplete();
        }, 500);
      }
    };

    const frameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  const p = progress / 100;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-6 md:p-14 bg-[#020204] text-white select-none pointer-events-auto overflow-hidden will-change-transform"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0.9,
            transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] }
          }}
        >
          {/* Top Status */}
          <div className="flex justify-between items-center text-[10px] font-mono tracking-[0.35em] text-neutral-500 uppercase z-20">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-neutral-300">CORE INITIALIZATION</span>
            </div>
            <span className="hidden sm:inline">MNKDIGITAL // STUDIO PIPELINE</span>
          </div>

          {/* Central Sacred Geometry & GPU-Accelerated Scramble Typography */}
          <div className="relative flex items-center justify-center my-auto z-10">
            <svg
              className="w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] md:w-[540px] md:h-[540px] text-white pointer-events-none transform-gpu"
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Rotating Compass Orbit */}
              <circle
                cx="300"
                cy="300"
                r="275"
                stroke="rgba(59, 130, 246, 0.35)"
                strokeWidth="1"
                strokeDasharray="6 14"
                className="animate-[spin_30s_linear_infinite] origin-center"
              />

              {/* Path length circles dengan transisi GPU murni */}
              <circle
                cx="300"
                cy="300"
                r="230"
                stroke="rgba(255, 255, 255, 0.18)"
                strokeWidth="1"
                strokeDasharray="1445"
                strokeDashoffset={1445 * (1 - p)}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />

              <circle
                cx="300"
                cy="300"
                r="185"
                stroke="rgba(59, 130, 246, 0.65)"
                strokeWidth="1.5"
                strokeDasharray="1162"
                strokeDashoffset={1162 * (1 - p)}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />

              {/* Sacred Triangles */}
              <polygon
                points="300,45 75,455 525,455"
                stroke="rgba(96, 165, 250, 0.85)"
                strokeWidth="1.5"
                strokeDasharray="1500"
                strokeDashoffset={1500 * (1 - p)}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
              <polygon
                points="300,555 75,145 525,145"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
                strokeDasharray="8 8"
              />

              {/* Center Crosshair Axes */}
              <line
                x1="0"
                y1="300"
                x2="600"
                y2="300"
                stroke="rgba(59, 130, 246, 0.25)"
                strokeWidth="1"
                style={{ transform: `scaleX(${p})`, transformOrigin: 'center', transition: 'transform 0.1s linear' }}
              />
              <line
                x1="300"
                y1="0"
                x2="300"
                y2="600"
                stroke="rgba(59, 130, 246, 0.25)"
                strokeWidth="1"
                style={{ transform: `scaleY(${p})`, transformOrigin: 'center', transition: 'transform 0.1s linear' }}
              />
            </svg>

            {/* Glowing Brand Kinetic Typography */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] md:text-xs font-mono tracking-[0.5em] text-cyan-400 uppercase mb-4">
                SECURITY & ENGINEERING
              </span>
              
              <FastScrambleText progress={progress} />
            </div>
          </div>

          {/* Bottom Progress Counter & Boot Logs */}
          <div className="space-y-4 max-w-4xl mx-auto w-full font-mono z-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="text-cyan-400 font-bold">&gt;</span>
                <span className="tracking-wider">{BOOT_LOGS[logIndex]}</span>
              </div>
              <span className="text-4xl md:text-6xl font-extrabold tracking-tight text-white tabular-nums">
                {progress.toString().padStart(2, '0')}%
              </span>
            </div>

            <div className="h-[2px] w-full bg-white/10 overflow-hidden relative rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-400 shadow-[0_0_15px_#3b82f6] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}