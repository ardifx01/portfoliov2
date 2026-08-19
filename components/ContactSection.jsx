'use client';

import { useState } from 'react';

const PROJECT_TYPES = [
  'Web & Mobile App',
  'Backend & Architecture',
  'Security & PenTest Audit',
  'Infrastructure / Cloud'
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const email = 'contact@mnkdigital.tech';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const subject = encodeURIComponent(`[INQUIRY] ${selectedType} - ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nScope: ${selectedType}\n\nBrief:\n${formState.message}`
    );
    
    setTimeout(() => {
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      
      // Reset input form
      setFormState({ name: '', email: '', message: '' });
      setSelectedType(PROJECT_TYPES[0]);

      setIsSubmitting(false);
      setSubmitted(true);

      setTimeout(() => setSubmitted(false), 5000);
    }, 600);
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-16 border-t border-white/[0.06] relative z-10 bg-[#03060f]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto font-mono">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span className="text-xs tracking-[0.25em] text-cyan-400 uppercase">
              INITIATE TRANSMISSION
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans mb-3">
            Let’s Build Secure, Resilient Systems.
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-sans font-light max-w-2xl">
            Punya kebutuhan arsitektur baru, perbaikan backend performa tinggi, atau pengujian keamanan sistem? Kirim pesan atau hubungi langsung via kanal resmi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Kolom Kiri: Direct Communication & Status */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Availability Box */}
              <div className="p-6 rounded-2xl bg-[#090b10] border border-white/[0.06] relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-neutral-500 tracking-widest uppercase">System Status</span>
                  <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    OPEN FOR CLIENTS
                  </span>
                </div>
                <div className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Tersedia untuk proyek *Custom Web/App Engineering*, *Architecture Advisory*, maupun *Security Audit*.
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-neutral-500">
                  <span>RESPONSE TIME</span>
                  <span className="text-white font-semibold">&lt; 12 Hours</span>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="space-y-3">
                <div className="text-[10px] text-neutral-500 tracking-widest uppercase mb-2">Direct Node Endpoints</div>

                {/* Copy Email Button */}
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.04] transition-all group text-left cursor-pointer"
                >
                  <div className="overflow-hidden">
                    <div className="text-[10px] text-neutral-500 uppercase">Direct Email</div>
                    <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {email}
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 shrink-0">
                    {copied ? 'COPIED ✓' : 'COPY'}
                  </span>
                </button>

                {/* Social Nodes */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://github.com/ardifx01"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 flex items-center justify-between text-xs text-neutral-300 hover:text-white transition-all"
                  >
                    <span>GITHUB</span>
                    <span className="text-neutral-500">↗</span>
                  </a>
                  <a
                    href="https://mnkdigital.tech"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 flex items-center justify-between text-xs text-neutral-300 hover:text-white transition-all"
                  >
                    <span>WEBSITE</span>
                    <span className="text-neutral-500">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* PGP / Protocol */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] text-[10px] text-neutral-600 space-y-1">
              <div className="text-neutral-500 uppercase tracking-widest">COMMS_ENCRYPTION</div>
              <div className="truncate text-neutral-400 font-mono">TLS 1.3 / E2E ENCRYPTED PROTOCOL</div>
            </div>
          </div>

          {/* Kolom Kanan: Interactive Project Form */}
          <div className="lg:col-span-7 bg-[#090b10] border border-white/10 rounded-2xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Scope Selector */}
              <div>
                <label className="block text-xs text-neutral-400 mb-2 uppercase tracking-wider">
                  01 // Project Domain / Scope:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`text-xs p-3 rounded-lg border text-left transition-all ${
                        selectedType === type
                          ? 'border-cyan-400/80 bg-cyan-950/40 text-cyan-300 font-bold'
                          : 'border-white/5 bg-white/[0.02] text-neutral-400 hover:border-white/15'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-2 uppercase tracking-wider">
                    02 // Your Identity / Company
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hendra / NexaCorp"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#04060b] border border-white/10 focus:border-cyan-400/70 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-2 uppercase tracking-wider">
                    03 // Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="hendra@domain.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[#04060b] border border-white/10 focus:border-cyan-400/70 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-neutral-400 mb-2 uppercase tracking-wider">
                  04 // Project Brief & Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ceritakan gambaran singkat sistem, target timeline, atau kendala teknis yang ingin diselesaikan..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-[#04060b] border border-white/10 focus:border-cyan-400/70 rounded-xl p-4 text-xs text-white placeholder-neutral-600 outline-none transition-colors resize-none font-sans"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-[0.2em] uppercase transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'PREPARING TRANSMISSION...' : 'TRANSMIT INQUIRY'}</span>
                <span>→</span>
              </button>

              {submitted && (
                <div className="text-center text-xs text-emerald-400 pt-2 animate-pulse">
                  ✓ Form terverifikasi &amp; di-reset. Membuka email client untuk transmisi...
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}