'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Web Platform', 'Mobile App', 'API & Data', 'Tools & Security', 'Open Source'];
const ITEMS_PER_PAGE = 8;

const LANGUAGE_BADGES = {
  JavaScript: 'border-amber-400/30 text-amber-300 bg-amber-400/5',
  TypeScript: 'border-blue-400/30 text-blue-300 bg-blue-400/5',
  Python: 'border-emerald-400/30 text-emerald-300 bg-emerald-400/5',
  Dart: 'border-cyan-400/30 text-cyan-300 bg-cyan-400/5',
  PHP: 'border-indigo-400/30 text-indigo-300 bg-indigo-400/5',
  Go: 'border-teal-400/30 text-teal-300 bg-teal-400/5',
  HTML: 'border-orange-400/30 text-orange-300 bg-orange-400/5',
  Default: 'border-neutral-700 text-neutral-300 bg-white/[0.02]',
};

// Card Component dengan Mouse Spotlight Glow
function ProjectRow({ item, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const badgeClass = LANGUAGE_BADGES[item.language] || LANGUAGE_BADGES.Default;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl bg-[#090b10]/70 border border-white/[0.07] hover:border-cyan-500/40 p-6 md:p-8 backdrop-blur-xl transition-all duration-300 overflow-hidden shadow-lg hover:shadow-[0_0_35px_rgba(6,182,212,0.12)]"
    >
      {/* Dynamic Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.12), transparent 80%)`,
        }}
      />

      {/* Decorative Index Watermark */}
      <span className="absolute right-6 top-6 font-mono text-5xl md:text-6xl font-black text-white/[0.02] group-hover:text-cyan-400/[0.07] select-none transition-colors duration-500 pointer-events-none">
        {item.id}
      </span>

      <div className="relative z-10 flex flex-col justify-between h-full gap-6">
        <div>
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-md">
                NODE // {item.id}
              </span>
              <span className="text-xs font-mono text-neutral-400 tracking-wider">
                {item.category.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
              {(item.stars > 0 || item.forks > 0) && (
                <div className="flex items-center gap-3">
                  {item.stars > 0 && <span className="text-amber-400 flex items-center gap-1">★ {item.stars}</span>}
                  {item.forks > 0 && <span className="text-neutral-400">⑂ {item.forks}</span>}
                </div>
              )}
              <span className="text-[11px] text-neutral-500">
                {new Date(item.updatedAt).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Repo Name */}
          <a
            href={item.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group/title"
          >
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover/title:text-cyan-300 font-mono transition-colors">
              {item.name}
            </h3>
            <span className="text-sm text-neutral-500 group-hover/title:text-cyan-300 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all">
              ↗
            </span>
          </a>

          {/* Summary */}
          <p className="mt-3 text-neutral-400 text-sm font-light leading-relaxed line-clamp-2 md:line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Footer Tags & CTA */}
        <div className="pt-4 border-t border-white/[0.05] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${badgeClass}`}>
              {item.language}
            </span>
            {item.topics.slice(0, 3).map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-neutral-400 group-hover:text-neutral-300 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          <a
            href={item.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-neutral-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors ml-auto"
          >
            Source Code <span>→</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function MassiveProjectsShowcase() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadAllRepos() {
      try {
        const res = await fetch('/api/github');
        const json = await res.json();
        if (json.success) setProjects(json.projects);
      } catch (e) {
        console.error('Failed fetching repo database', e);
      } finally {
        setLoading(false);
      }
    }
    loadAllRepos();
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const query = search.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.language.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });
  }, [projects, activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section id="works" className="py-28 px-6 md:px-16 border-t border-white/[0.06] bg-[#030712]/60 backdrop-blur-2xl relative z-10 overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase">
                CODEBASE DIRECTORY // 300+ NODES
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white font-mono">
              Projects Archive
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 bg-[#090b10]/90 border border-white/[0.08] px-4 py-2.5 rounded-xl backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>TOTAL INDEXED:</span>
            <span className="text-white font-bold">{loading ? 'SCANNING...' : `${projects.length} REPOSITORIES`}</span>
          </div>
        </div>

        {/* Filter Controls: Glass Search & Cyber Tabs */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-10">
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              placeholder="Search by name, tech stack, topic..."
              value={search}
              onChange={handleSearchChange}
              className="w-full bg-[#090b10]/80 border border-white/[0.09] focus:border-cyan-400/60 rounded-xl px-4 py-3 pl-10 text-sm font-mono text-white placeholder-neutral-500 outline-none transition-all duration-200 shadow-inner"
            />
            <span className="absolute left-3.5 top-3.5 text-neutral-500 text-sm">⌕</span>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1 bg-[#090b10]/80 border border-white/[0.07] rounded-xl backdrop-blur-md">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`font-mono text-xs px-3.5 py-2 rounded-lg transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/40 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-[#090b10]/60 border border-white/5 animate-pulse p-6" />
            ))}
          </div>
        )}

        {/* Projects 2-Column Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {paginatedItems.map((item, idx) => (
                <ProjectRow key={item.rawName} item={item} index={idx} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-24 rounded-2xl border border-white/[0.04] bg-[#090b10]/40 font-mono text-sm text-neutral-500">
            No matching modules or repositories found for "{search}".
          </div>
        )}

        {/* Pagination Console */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/[0.05] font-mono text-xs">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2.5 rounded-xl bg-[#090b10] border border-white/[0.08] text-neutral-400 disabled:opacity-30 hover:border-cyan-500/40 hover:text-white transition-all"
            >
              ← PREVIOUS
            </button>

            <span className="text-neutral-400">
              PAGE <span className="text-cyan-400 font-bold">{currentPage}</span> / <span className="text-white">{totalPages}</span>
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2.5 rounded-xl bg-[#090b10] border border-white/[0.08] text-neutral-400 disabled:opacity-30 hover:border-cyan-500/40 hover:text-white transition-all"
            >
              NEXT →
            </button>
          </div>
        )}

      </div>
    </section>
  );
}