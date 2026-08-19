'use client';
import { useState } from 'react';

const targets = {
  "01": { service: "API Wilayah Indonesia", latency: "18ms", status: "SECURE", stack: "Go / Docker / Redis" },
  "02": { service: "JDIH Legal Repo", latency: "24ms", status: "HARDENED", stack: "PHP / Dart / Cloud" },
  "03": { service: "Auth & Penetration Engine", latency: "12ms", status: "ISOLATED", stack: "Python / CLI Scanner" }
};

export default function SecurityConsole() {
  const [activeKey, setActiveKey] = useState("01");
  const selected = targets[activeKey];

  return (
    <div className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl p-6 font-mono text-xs shadow-2xl">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block"></span>
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block"></span>
          <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block"></span>
          <span className="text-neutral-400 ml-2">mnk-telemetry-cli v2.4</span>
        </div>
        <span className="text-emerald-400 font-semibold">[ENCRYPTED]</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {Object.entries(targets).map(([key, item]) => (
          <button
            key={key}
            onClick={() => setActiveKey(key)}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeKey === key
                ? 'border-blue-500 bg-blue-500/10 text-white'
                : 'border-white/5 bg-neutral-900/40 text-neutral-400 hover:border-white/20'
            }`}
          >
            <div className="text-[10px] text-neutral-500 mb-1">TARGET #{key}</div>
            <div className="font-bold truncate">{item.service}</div>
          </button>
        ))}
      </div>

      <div className="bg-neutral-950 p-4 rounded-xl border border-white/5 space-y-2">
        <p className="text-neutral-500">&gt; probing target node: <span className="text-blue-400">{selected.service}</span></p>
        <p className="text-neutral-500">&gt; runtime environment: <span className="text-neutral-200">{selected.stack}</span></p>
        <p className="text-neutral-500">&gt; ping latency: <span className="text-emerald-400">{selected.latency}</span></p>
        <p className="text-neutral-500">&gt; security integrity: <span className="text-blue-400 font-bold">{selected.status} (0 Critical Vulnerabilities)</span></p>
      </div>
    </div>
  );
}
