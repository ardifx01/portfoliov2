'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PIPELINE_STAGES = [
  {
    id: 'arch',
    step: '01',
    name: 'Perancangan Arsitektur & Threat Modeling',
    badge: 'FONDASI & KEAMANAN',
    status: 'SYSTEM_READY',
    summary: 'Membangun denah blueprint sistem yang tahan beban tinggi dan memetakan potensi celah keamanan sebelum baris kode pertama ditulis.',
    clientValue: 'Mencegah biaya perbaikan besar di kemudian hari akibat salah arsitektur atau celah keamanan fatal.',
    details: [
      {
        title: 'Pemetaan Celah (Threat Modeling)',
        desc: 'Menganalisis alur data sensitif (seperti transaksi, login, token) agar kebal dari manipulasi pihak ketiga.'
      },
      {
        title: 'Arsitektur Skalabel (Zero-Trust)',
        desc: 'Memisahkan fungsi aplikasi ke modul-modul mandiri sehingga jika satu modul error, sistem utama tetap berjalan normal.'
      }
    ],
    tech: ['Next.js App Router', 'Modular Microservices', 'Zero-Trust Protocol', 'REST/GraphQL'],
    metrics: { uptimeTarget: '99.9%', threatMitigation: 'Tier 1' },
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'dev',
    step: '02',
    name: 'Clean Coding & Standar AppSec',
    badge: 'KODE BERSIH & AMAN',
    status: 'STATIC_SECURE',
    summary: 'Penulisan kode bersih dengan proteksi otomatis terhadap serangan siber populer (SQL Injection, XSS, CSRF).',
    clientValue: 'Aplikasi berjalan sangat cepat, minim bug/crash, dan data sensitif pengguna terlindungi maksimal.',
    details: [
      {
        title: 'Validasi Input Ketat (Schema Sanitization)',
        desc: 'Setiap formulir, input teks, dan request API disaring otomatis untuk memblokir script berbahaya dan bot spam.'
      },
      {
        title: 'Manajemen Hak Akses (Strict RBAC)',
        desc: 'Memastikan user biasa, staff, dan admin hanya bisa mengakses data yang sesuai dengan wewenangnya.'
      }
    ],
    tech: ['TypeScript / Python', 'TailwindCSS', 'Parameterized Queries', 'JWT / Session Auth'],
    metrics: { typeCoverage: '100%', codeQuality: 'A+' },
    color: 'from-cyan-400 to-teal-400'
  },
  {
    id: 'pipeline',
    step: '03',
    name: 'Automated CI/CD & Security Audit',
    badge: 'UJI KELAYAKAN OTOMATIS',
    status: 'AUDITED',
    summary: 'Pengujian performa dan pemindaian celah keamanan otomatis setiap kali ada pembaruan fitur sebelum dirilis ke publik.',
    clientValue: 'Update fitur baru bisa dirilis kapan saja secara cepat tanpa merusak fitur lama yang sudah berjalan.',
    details: [
      {
        title: 'Uji Celah Otomatis (SAST / Dependency Scan)',
        desc: 'Memeriksa seluruh pustaka pihak ketiga dari kerentanan usang sebelum kode diizinkan masuk ke server produksi.'
      },
      {
        title: 'Containerization Terisolasi',
        desc: 'Aplikasi dibungkus dalam container Docker yang identik di server lokal maupun cloud agar tidak ada drama error saat rilis.'
      }
    ],
    tech: ['GitHub Actions', 'Docker Containers', 'Automated SAST Scan', 'Integration Tests'],
    metrics: { buildLatency: '< 90s', vulnerabilityGate: 'Passed' },
    color: 'from-indigo-400 to-blue-500'
  },
  {
    id: 'infra',
    step: '04',
    name: 'Edge Deployment & Server Hardening',
    badge: 'INFRASTRUKTUR GLOBAL',
    status: 'LIVE_PROTECTED',
    summary: 'Penyebaran aplikasi ke jaringan server global (Edge CDN) dengan proteksi anti-DDoS, SSL modern, dan pembatasan bot.',
    clientValue: 'Website bisa diakses super kilat dari lokasi mana pun di dunia dan tetap stabil saat diserbu ribuan pengunjung bersamaan.',
    details: [
      {
        title: 'Anti-DDoS & Adaptive Rate Limiting',
        desc: 'Membatasi request mencurigakan secara otomatis untuk melindungi database dari lonjakan trafik spam/brute-force.'
      },
      {
        title: 'Optimasi Kecepatan Global (Edge Caching)',
        desc: 'Aset gambar dan halaman di-cache di server terdekat dengan pengunjung untuk memangkas waktu loading hingga di bawah 1 detik.'
      }
    ],
    tech: ['Cloudflare / Vercel Edge', 'Linux VPS Hardening', 'TLS 1.3 Strict', 'Redis Rate Limiter'],
    metrics: { globalTTFB: '< 45ms', uptimeSLA: '99.99%' },
    color: 'from-sky-400 to-blue-600'
  }
];

export default function PipelineVisualizer() {
  const [activeStage, setActiveStage] = useState(PIPELINE_STAGES[0]);

  return (
    <div className="w-full bg-[#050811] border border-white/10 rounded-3xl p-6 md:p-10 font-mono shadow-2xl relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs tracking-widest uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Development & Security Protocol</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            SOP & Standar Rekayasa Sistem
          </h3>
        </div>
        <div className="text-xs text-neutral-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg w-fit">
          STATUS: <span className="text-emerald-400 font-semibold">{activeStage.status}</span>
        </div>
      </div>

      {/* Step Navigation Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8 relative z-10">
        {PIPELINE_STAGES.map((stage) => {
          const isSelected = activeStage.id === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage)}
              className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-300 relative group cursor-pointer ${
                isSelected
                  ? 'bg-white/[0.08] border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.15)]'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-[11px] text-neutral-500 font-bold tracking-widest">{stage.step}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded border ${
                  isSelected 
                    ? 'border-cyan-400/40 text-cyan-300 bg-cyan-950/40' 
                    : 'border-white/10 text-neutral-500'
                }`}>
                  {stage.badge}
                </span>
              </div>
              <div className={`text-sm font-semibold tracking-wide transition-colors ${
                isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
              }`}>
                {stage.name.split('&')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Content Showcase */}
      <div className="relative z-10 bg-black/50 border border-white/10 rounded-2xl p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Title & Summary */}
            <div>
              <div className="flex items-center gap-3 text-cyan-400 text-sm font-bold mb-2">
                <span>TAHAP {activeStage.step} //</span>
                <span className="text-white text-lg md:text-xl font-bold">{activeStage.name}</span>
              </div>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                {activeStage.summary}
              </p>
            </div>

            {/* Client Business Value Box */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30 w-fit shrink-0">
                Nilai Bisnis
              </span>
              <p className="text-xs font-sans text-cyan-100/90 leading-normal">
                {activeStage.clientValue}
              </p>
            </div>

            {/* 2 Detail Poin Penjelasan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeStage.details.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="text-cyan-400">▸</span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs font-sans text-neutral-400 leading-relaxed pl-3.5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech Stack List */}
            <div className="pt-2 border-t border-white/5">
              <span className="text-[10px] text-neutral-500 tracking-widest uppercase block mb-3">
                Teknologi & Standar Keamanan:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeStage.tech.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-cyan-300 font-mono"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}