'use client';

import BrandLogo from './BrandLogo'; // Pastikan path sesuai lokasi file BrandLogo.jsx

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 bg-black/40 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* BRAND LOGO AREA */}
        <a href="#" className="flex items-center gap-3.5 group">
          <BrandLogo size={40} />
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
              MNKDIGITAL
            </span>
            <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">
              Security & Engineering
            </span>
          </div>
        </a>

        {/* NAVIGATION LINKS */}
        <nav className="flex items-center gap-6 font-mono text-xs text-neutral-400">
          <a href="#telemetry" className="hover:text-cyan-300 transition-colors">Telemetry</a>
          <a href="#works" className="hover:text-cyan-300 transition-colors">Projects</a>
          <a href="#contact" className="px-3.5 py-1.5 rounded-lg border border-white/10 hover:border-cyan-400 text-white transition-colors">Contact</a>
        </nav>

      </div>
    </header>
  );
}