'use client';

import { motion } from 'framer-motion';

const TESTIMONIALS_DATA = [
  {
    quote: "Jujur awalnya ragu outsource audit keamanan, tapi MNKDIGITAL detail banget. Dia nemu celah logic di flow payment & webhook gateway yang tim kami skip berbulan-bulan. Laporannya to the point, plus dikasih PoC dan panduan remediasinya sampai tuntas.",
    name: "Dimas Pratama",
    title: "Head of Engineering, PayFlow ID",
    initials: "DP",
    color: "from-cyan-500 to-blue-500"
  },
  {
    quote: "Migrasi sistem monolitik kita ke microservices jalan mulus tanpa ada downtime sama sekali. MNKDIGITAL ngebantu setup CI/CD pipeline, Docker containerization, sama implementasi Redis caching buat nahan traffic campaign gila-gilaan. Delivery-nya cepet banget.",
    name: "Fadhil Ramadhan",
    title: "Tech Lead, LogiSync Indonesia",
    initials: "FR",
    color: "from-blue-500 to-indigo-500"
  },
  {
    quote: "Sempet pusing gara-gara sering kena credential stuffing & bot abuse di form login. Dibantu pasang rate limiting adaptif dan hardening Nginx + Cloudflare Rules. Latensi API malah makin enteng. Komunikasi selama sprint juga super enak.",
    name: "Kevin Sanjaya",
    title: "Co-Founder & CTO, KursusKilat",
    initials: "KS",
    color: "from-cyan-400 to-teal-400"
  },
  {
    quote: "Full-stack development-nya clean banget. Dari frontend Next.js yang snappy sampai backend API terstruktur rapi pake validasi skema ketat. Jarang nemu engineer yang balance antara estetika UI modern sama security awareness tinggi.",
    name: "Nadhira Az-Zahra",
    title: "Senior Product Manager, Finvest Lab",
    initials: "NA",
    color: "from-indigo-400 to-purple-500"
  },
  {
    quote: "Hasil penetration testing dari MNKDIGITAL ngebantu banget pas tim kita persiapan compliance audit. Temuannya jelas, risikonya diklasifikasi sesuai CVSS score, dan fix-nya dibimbing langsung. Sangat profesional dan responsif.",
    name: "Rian Aditya",
    title: "DevSecOps Lead, Krediva Solusi",
    initials: "RA",
    color: "from-teal-400 to-cyan-500"
  },
  {
    quote: "Web app arsitektur buatan MNKDIGITAL bener-bener resilient. Waktu peluncuran produk dan traffic melonjak 10x lipat, server tetep stabil dengan TTFB di bawah 50ms. Worth every penny buat yang cari engineer tier atas.",
    name: "Bayu Wicaksono",
    title: "VP of Technology, MediaNusa Digital",
    initials: "BW",
    color: "from-sky-400 to-blue-600"
  }
];

export default function Testimonials() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono relative">
      {/* Background Decorative Grid */}
      <div className="absolute -inset-10 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-15 pointer-events-none" />

      {TESTIMONIALS_DATA.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: idx * 0.08 }}
          className="relative group rounded-2xl bg-[#090b10]/90 border border-white/[0.06] p-7 backdrop-blur-md flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)]"
        >
          {/* Quote Icon Accent */}
          <div className="absolute top-5 right-6 text-4xl font-serif text-white/5 group-hover:text-cyan-400/20 transition-colors pointer-events-none">
            “
          </div>

          <div className="relative z-10 flex-grow">
            {/* Status Header */}
            <div className="flex items-center gap-2 mb-4 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Client // Review</span>
            </div>

            {/* Testimonial Quote */}
            <p className="text-sm font-sans text-neutral-300 leading-relaxed mb-6 font-normal">
              “{item.quote}”
            </p>
          </div>

          {/* Profile Card Footer */}
          <div className="flex items-center gap-3.5 pt-5 border-t border-white/[0.05] relative z-10">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-black font-extrabold text-xs shadow-md shrink-0`}>
              {item.initials}
            </div>

            <div className="overflow-hidden">
              <div className="text-sm font-bold text-white tracking-tight truncate">
                {item.name}
              </div>
              <div className="text-xs text-neutral-400 tracking-wide truncate mt-0.5">
                {item.title}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}