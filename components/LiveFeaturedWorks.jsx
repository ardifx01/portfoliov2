'use client';

import { useEffect, useState } from 'react';

export default function LiveFeaturedWorks() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTelemetry() {
      try {
        const res = await fetch('/api/telemetry');
        const json = await res.json();
        if (json.success) setData(json);
      } catch (err) {
        console.error('Error loading telemetry:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTelemetry();
  }, []);

  const gh = data?.github;
  const waka = data?.wakatime;

  return (
    <section id="telemetry" className="py-28 px-6 md:px-16 border-t border-white/[0.06] bg-black/40 backdrop-blur-md relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-mono">
                DEVELOPER TELEMETRY & STREAK PIPELINE
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              System Activity & Metrics
            </h2>
          </div>

          <div className="font-mono text-xs text-neutral-400 bg-[#090b10] border border-white/[0.08] px-4 py-2.5 rounded-xl">
            GITHUB SYNC // <span className="text-emerald-400 font-bold">LIVE STREAK ACTIVE</span>
          </div>
        </div>

        {/* Dashboard Grid 3 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CARD 1: GitHub Contribution & Streak (UPGRADED) */}
          <div className="p-8 rounded-2xl bg-[#090b10]/85 border border-white/[0.08] backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500 mb-6">
                <span>// NODE_CONTRIBS</span>
                <span className="text-emerald-400 font-semibold">🔥 {loading ? '...' : `${gh?.currentStreak || 0} DAYS STREAK`}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-6">Git Contribution Stream</h3>

              <div className="space-y-4 font-mono">
                <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                  <span className="text-xs text-neutral-400">ANNUAL COMMITS</span>
                  <span className="text-base font-bold text-white">{loading ? '...' : `${gh?.totalContributions} events`}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                  <span className="text-xs text-neutral-400">LONGEST RECORD STREAK</span>
                  <span className="text-base font-bold text-emerald-400">{loading ? '...' : `${gh?.longestStreak} days`}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs text-neutral-400">PUBLIC REPOSITORIES</span>
                  <span className="text-base font-bold text-cyan-400">{loading ? '...' : `${gh?.publicRepos}+`}</span>
                </div>
              </div>

              {/* Mini Heatmap Grid (4 Minggu Terakhir) */}
              {gh?.recentDays && gh.recentDays.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/[0.04]">
                  <span className="font-mono text-[10px] text-neutral-500 block mb-2">RECENT 28-DAY ACTIVITY HEATMAP</span>
                  <div className="grid grid-cols-7 gap-1.5">
                    {gh.recentDays.map((day, idx) => (
                      <div
                        key={idx}
                        title={`${day.date}: ${day.contributionCount} contributions`}
                        className={`h-3 rounded-sm transition-all ${
                          day.contributionCount === 0
                            ? 'bg-neutral-800/80 border border-white/[0.03]'
                            : day.contributionCount < 3
                            ? 'bg-emerald-700 shadow-[0_0_4px_#059669]'
                            : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.04]">
              <a
                href="https://github.com/ardifx01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
              >
                Inspect GitHub Profile ↗
              </a>
            </div>
          </div>

          {/* CARD 2: WakaTime Runtime Logs */}
          <div className="p-8 rounded-2xl bg-[#090b10]/85 border border-white/[0.08] backdrop-blur-md flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500 mb-6">
                <span>// NODE_WAKA</span>
                <span>TIME_TELEMETRY</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-6">WakaTime IDE Log</h3>

              <div className="space-y-4 font-mono">
                <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                  <span className="text-xs text-neutral-400">7-DAY RECORDED TIME</span>
                  <span className="text-base font-bold text-white">{loading ? '...' : waka?.totalHours}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                  <span className="text-xs text-neutral-400">DAILY RUNTIME AVG</span>
                  <span className="text-base font-bold text-cyan-400">{loading ? '...' : waka?.dailyAverage}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs text-neutral-400">DEV ENVIRONMENT</span>
                  <span className="text-xs text-neutral-300">VS Code / Linux</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.04] text-[11px] font-mono text-neutral-500">
              * Automated tracking via IDE Telemetry plugin
            </div>
          </div>

          {/* CARD 3: Language Stack Breakdown */}
          <div className="p-8 rounded-2xl bg-[#090b10]/85 border border-white/[0.08] backdrop-blur-md flex flex-col justify-between hover:border-blue-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500 mb-6">
                <span>// COMPILER_MIX</span>
                <span>SYS_LANG</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-6">Active Language Stack</h3>

              <div className="space-y-4">
                {waka?.languages?.map((lang, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-mono text-neutral-400 mb-1.5">
                      <span>{lang.name}</span>
                      <span className="text-white font-semibold">{lang.percent.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/[0.05]">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full transition-all duration-700"
                        style={{ width: `${lang.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.04] font-mono text-[11px] text-neutral-500">
              Cleaned programming languages distribution
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}