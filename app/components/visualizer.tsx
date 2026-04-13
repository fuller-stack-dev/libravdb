"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = [
  { id: "INGEST", num: "01", desc: "Gate & embed incoming context" },
  { id: "RANK", num: "02", desc: "Score relevance via cosine distance" },
  { id: "COMPACT", num: "03", desc: "Geometry-grounded compaction" },
  { id: "RECALL", num: "04", desc: "Retrieve ranked memory shards" },
] as const;

const SCOPES = [
  { label: "SESSION", color: "#00fc40" },
  { label: "USER", color: "#b6a0ff" },
  { label: "GLOBAL", color: "#7e51ff" },
] as const;

function useCounter(max: number, interval: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setVal((v) => (v + 1) % max), interval);
    return () => clearInterval(id);
  }, [max, interval]);
  return val;
}

export function Visualizer() {
  const activeStage = useCounter(4, 2000);
  const [memCount, setMemCount] = useState(42);
  const tickRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      tickRef.current++;
      setMemCount(38 + Math.floor(Math.random() * 20));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-32 px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Visualization */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full" />
            <div className="relative bg-surface-container-highest border border-primary/20 hard-shadow-primary overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-outline-variant/20 bg-surface-container-low">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-error" />
                  <div className="w-2 h-2 bg-secondary" />
                  <div className="w-2 h-2 bg-primary" />
                </div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase">
                  Pipeline_Monitor
                </span>
              </div>

              {/* Pipeline stages */}
              <div className="p-6">
                <div className="flex flex-col gap-0">
                  {STAGES.map((stage, i) => (
                    <div key={stage.id}>
                      {/* Stage row */}
                      <div
                        className="flex items-stretch gap-4 transition-all duration-500"
                        style={{
                          opacity: activeStage === i ? 1 : 0.4,
                        }}
                      >
                        {/* Number column */}
                        <div className="w-10 flex-shrink-0 flex flex-col items-center">
                          <span
                            className="font-mono text-[10px] transition-colors duration-500"
                            style={{
                              color:
                                activeStage === i ? "#00fc40" : "#494847",
                            }}
                          >
                            {stage.num}
                          </span>
                        </div>

                        {/* Stage box */}
                        <div
                          className="flex-1 border p-4 transition-all duration-500"
                          style={{
                            borderColor:
                              activeStage === i
                                ? "rgba(182, 160, 255, 0.5)"
                                : "rgba(73, 72, 71, 0.3)",
                            backgroundColor:
                              activeStage === i
                                ? "rgba(126, 81, 255, 0.06)"
                                : "transparent",
                            boxShadow:
                              activeStage === i
                                ? "0 0 20px rgba(126, 81, 255, 0.1)"
                                : "none",
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-sm font-bold tracking-widest text-white">
                              {stage.id}
                            </span>
                            {activeStage === i && (
                              <span className="font-mono text-[9px] text-secondary tracking-wider animate-pulse">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-[11px] text-on-surface-variant">
                            {stage.desc}
                          </span>

                          {/* Progress bar for active stage */}
                          <div className="mt-3 h-[2px] bg-outline-variant/20 overflow-hidden">
                            <div
                              className="h-full transition-all duration-500"
                              style={{
                                width: activeStage === i ? "100%" : "0%",
                                background:
                                  activeStage === i
                                    ? "linear-gradient(90deg, #7e51ff, #b6a0ff, #00fc40)"
                                    : "transparent",
                                transition: activeStage === i
                                  ? "width 1.8s ease-in-out"
                                  : "width 0.3s ease",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Connector */}
                      {i < STAGES.length - 1 && (
                        <div className="flex items-center gap-4 h-4">
                          <div className="w-10 flex-shrink-0 flex justify-center">
                            <div
                              className="w-[1px] h-full transition-colors duration-500"
                              style={{
                                backgroundColor:
                                  activeStage === i
                                    ? "rgba(182, 160, 255, 0.4)"
                                    : "rgba(73, 72, 71, 0.2)",
                              }}
                            />
                          </div>
                          <div className="flex-1 flex items-center">
                            <svg width="12" height="16" viewBox="0 0 12 16" className="opacity-20">
                              <path d="M6 0 L6 12 L2 8 M6 12 L10 8" stroke="#b6a0ff" fill="none" strokeWidth="1" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer: Scope indicators + stats */}
                <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    {SCOPES.map((scope) => (
                      <div key={scope.label} className="flex items-center gap-2">
                        <div
                          className="w-2 h-2"
                          style={{ backgroundColor: scope.color }}
                        />
                        <span className="font-mono text-[9px] uppercase tracking-wider text-on-surface-variant">
                          {scope.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="font-mono text-[9px] text-on-surface-variant/50">
                    [ACTIVE_MEMORIES: {memCount}]
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="order-1 lg:order-2">
            <div className="font-mono text-xs text-primary mb-6 uppercase tracking-widest">
              &gt; Context_Engine
            </div>
            <h2 className="font-headline text-5xl font-black uppercase text-white mb-8 leading-tight">
              Ingest. Rank. <br /> Compact. Recall.
            </h2>
            <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-10">
              LibraVDB replaces the entire context lifecycle — from ingestion
              gating through retrieval ranking to automatic compaction. Summaries
              are grounded in embedding space, not decoder confidence. Drifted
              summaries get rejected.
            </p>
            <ul className="space-y-4 font-mono text-xs uppercase text-zinc-500">
              <li className="flex items-center gap-4">
                <span className="text-primary">01</span>
                <span className="text-zinc-300">
                  Domain-Adaptive Ingestion Gate
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-primary">02</span>
                <span className="text-zinc-300">
                  Five-Tier Injection Hierarchy
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-primary">03</span>
                <span className="text-zinc-300">
                  Geometry-Grounded Compaction
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
