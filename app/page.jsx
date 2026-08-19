'use client';

import { useState } from 'react';
import KineticText from '../components/KineticText';
import Preloader from '../components/Preloader';
import CustomCursor from '../components/CustomCursor';
import AudioToggle from '../components/AudioToggle';
import HorizontalWorks from '../components/HorizontalWorks';
import LiveFeaturedWorks from '../components/LiveFeaturedWorks';
import PipelineVisualizer from '../components/PipelineVisualizer';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import MasterCanvas from '../components/MasterCanvas';
import TextScramble from '../components/TextScramble';
import { profileData } from '../data/portfolio';

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <CustomCursor />
      
      {/* 3D WebGL Background Layer */}
      <MasterCanvas />

      <main className="relative min-h-screen font-sans antialiased overflow-x-hidden text-[#f1f1f3] z-10">
        {/* Navigation Bar */}
        <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 md:px-14 py-5 backdrop-blur-xl bg-[#040406]/60 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]"></span>
            <span className="font-mono font-bold tracking-[0.25em] text-sm text-white">{profileData.brand}</span>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8 text-xs font-mono tracking-widest text-neutral-400 uppercase">
              <a href="#home" className="hover:text-white transition-colors">Home</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#telemetry" className="hover:text-white transition-colors">Telemetry</a>
              <a href="#pipeline" className="hover:text-white transition-colors">Pipeline</a>
              <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
            </nav>
            <AudioToggle />
          </div>
        </header>

        {/* Hero Section (Home) */}
        <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-20">
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs mb-6 backdrop-blur-md">
              <span>●</span> <TextScramble text={profileData.role} speed={40} />
            </div>

            {/* Kinetic 3D Interactive Typography */}
            <div className="mb-6">
              <KineticText 
                text="MNKDIGITAL" 
                className="text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none mb-4 block" 
              />
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-300">
                <TextScramble text={profileData.tagline} speed={15} />
              </h2>
            </div>

            <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed font-light mb-8">
              {profileData.bio}
            </p>

            <div className="flex flex-wrap gap-8 pt-4 border-t border-white/[0.08]">
              {profileData.stats.map((s, idx) => (
                <div key={idx}>
                  <div className="text-2xl font-bold font-mono text-white">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider text-neutral-500 font-mono">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disciplines / Services */}
        <section id="services" className="py-28 px-6 md:px-16 border-t border-white/[0.06] bg-black/40 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
                <span className="font-mono text-xs tracking-[0.25em] text-[#38bdf8] uppercase">
                  CAPABILITIES
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Core Disciplines
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileData.services.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl bg-[#090b10]/80 border border-white/[0.07] p-8 md:p-10 backdrop-blur-md transition-all duration-300 hover:border-white/[0.16] hover:bg-[#0c0f17]/90 flex flex-col justify-between"
                >
                  <div>
                    <span className="block font-mono text-xs text-neutral-500 mb-6 group-hover:text-neutral-400 transition-colors">
                      {item.code ? `${item.code} //` : `0${idx + 1} //`}
                    </span>
                    <h3 className="text-2xl font-semibold text-white tracking-tight mb-4 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-[15px] text-neutral-400 leading-relaxed mb-10 font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/[0.04]">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-xs px-3.5 py-1.5 rounded-md bg-[#0d1117] border border-white/[0.08] text-neutral-300 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Archive (Horizontal Works) */}
        <div id="projects">
          <HorizontalWorks />
        </div>

        {/* System Activity & Metrics (Live GitHub Telemetry) */}
        <section id="telemetry">
          <LiveFeaturedWorks />
        </section>

        {/* Architecture Pipeline */}
        <section id="pipeline" className="py-28 px-6 md:px-16 border-t border-white/[0.06] relative z-10 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <PipelineVisualizer />
          </div>
        </section>

        {/* Client & Peer Testimonials (Reviews) */}
        <section id="reviews" className="py-28 px-6 md:px-16 border-t border-white/[0.06] bg-black/40 backdrop-blur-md relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
                <span className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase">
                  PROVEN IMPACT
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Client & Peer Trust
              </h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
                Endorsements from technical leaders and partners regarding security auditing, systems engineering, and full-stack delivery.
              </p>
            </div>
            
            <Testimonials />
          </div>
        </section>

        {/* Contact / Work Inquiry Section */}
        <ContactSection />

        {/* Footer */}
        <footer className="py-16 px-6 md:px-16 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 bg-black/80">
          <div className="text-xs font-mono text-neutral-500">
            © {new Date().getFullYear()} {profileData.brand}. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs font-mono text-neutral-400">
            <a href="https://github.com/ardifx01" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
            <a href="https://mnkdigital.tech" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">mnkdigital.tech</a>
          </div>
        </footer>
      </main>
    </>
  );
}