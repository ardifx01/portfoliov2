'use client';

export default function BrandLogo({ size = 44, className = '' }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Dynamic Glow Layer di Belakang */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      {/* SVG Container Logo */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]"
      >
        <defs>
          {/* Background Gradient */}
          <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>

          {/* Letter Gradient */}
          <linearGradient id="cyanBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          {/* Border Gradient */}
          <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Squircle Background Body */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="22"
          fill="url(#boxGrad)"
          stroke="url(#borderGrad)"
          strokeWidth="2.5"
        />

        {/* Tech Grid Lines Subtlety */}
        <line x1="20" y1="4" x2="20" y2="96" stroke="white" strokeOpacity="0.04" strokeWidth="1" />
        <line x1="80" y1="4" x2="80" y2="96" stroke="white" strokeOpacity="0.04" strokeWidth="1" />
        <line x1="4" y1="50" x2="96" y2="50" stroke="white" strokeOpacity="0.04" strokeWidth="1" />

        {/* Monogram 'MD' Path Isometric Vector */}
        <g fill="url(#cyanBlueGrad)">
          {/* Huruf 'M' */}
          <path d="M22 68V32H30.5L38 49L45.5 32H54V68H46V45.5L39.8 59H36.2L30 45.5V68H22Z" />

          {/* Huruf 'D' Interlocking */}
          <path d="M56 32H69C75.5 32 80 36.5 80 43V57C80 63.5 75.5 68 69 68H56V32ZM64 40V60H68.5C70.5 60 72 58.5 72 56V44C72 41.5 70.5 40 68.5 40H64Z" />
        </g>

        {/* Cyber Accent Dot / Power Node */}
        <circle cx="78" cy="22" r="3.5" fill="#38bdf8" />
        <circle cx="78" cy="22" r="6" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1.5" />
      </svg>
    </div>
  );
}