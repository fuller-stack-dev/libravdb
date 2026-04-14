import { Version } from "../components/version";

const benchmarks = [
  {
    label: "Embedding Latency",
    value: "~16ms",
    description: "Per-operation via Nomic Embed / ONNX Runtime on M-series silicon",
    bar: 8,
  },
  {
    label: "Retrieval (Top-K)",
    value: "~4ms",
    description: "Ranked multi-signal retrieval across all three scopes",
    bar: 4,
  },
  {
    label: "Ingestion Gate",
    value: "~2ms",
    description: "Domain-adaptive filtering to reject noise before storage",
    bar: 2,
  },
  {
    label: "Compaction Cycle",
    value: "~120ms",
    description: "Geometry-grounded summarization with drift rejection",
    bar: 60,
  },
  {
    label: "Sidecar Boot",
    value: "~80ms",
    description: "Cold start for the Go daemon including ONNX model load",
    bar: 40,
  },
  {
    label: "Memory Footprint",
    value: "~45MB",
    description: "Resident memory for sidecar with loaded ONNX model",
    bar: 22,
  },
];

const comparisons = [
  {
    metric: "Embedding Location",
    libravdb: "Local (ONNX)",
    cloudBased: "Cloud API",
  },
  {
    metric: "Data Privacy",
    libravdb: "Never leaves device",
    cloudBased: "Sent to third-party",
  },
  {
    metric: "Scope Management",
    libravdb: "3-tier (Session/User/Global)",
    cloudBased: "Flat / unscoped",
  },
  {
    metric: "Retrieval Ranking",
    libravdb: "Multi-signal (similarity + recency + scope + quality)",
    cloudBased: "Cosine distance only",
  },
  {
    metric: "Compaction",
    libravdb: "Geometry-grounded with drift rejection",
    cloudBased: "None or naive truncation",
  },
  {
    metric: "Cost",
    libravdb: "Free / Open source",
    cloudBased: "Per-token API billing",
  },
];

export default function BenchmarksPage() {
  return (
    <section className="py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-xs text-secondary mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-secondary animate-pulse" />
          PERFORMANCE_METRICS
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-6">
          Bench<span className="text-primary-dim">marks</span>
        </h1>
        <p className="text-zinc-500 font-mono text-sm mb-20 max-w-2xl">
          Measured on Apple M2 Pro, 16GB RAM, macOS 14.
          All operations local — no network latency.
        </p>

        {/* Latency bars */}
        <div className="mb-32">
          <h2 className="font-mono text-xs text-primary uppercase tracking-widest mb-10">
            &gt; Latency_Profile
          </h2>
          <div className="space-y-6">
            {benchmarks.map((b) => (
              <div key={b.label} className="group">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase w-40 shrink-0">
                      {b.label}
                    </span>
                    <span className="font-headline text-xl font-black text-white">
                      {b.value}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-600 hidden md:block">
                    {b.description}
                  </span>
                </div>
                <div className="h-1 bg-surface-container-highest relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-dim transition-all duration-700"
                    style={{ width: `${Math.min(b.bar, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div>
          <h2 className="font-mono text-xs text-primary uppercase tracking-widest mb-10">
            &gt; Vs_Cloud_Memory
          </h2>
          <div className="border border-outline-variant/20 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-surface-container-high">
              <div className="px-6 py-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                Metric
              </div>
              <div className="px-6 py-4 font-mono text-[10px] text-primary uppercase tracking-widest">
                LibraVDB
              </div>
              <div className="px-6 py-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                Cloud-Based
              </div>
            </div>
            {/* Rows */}
            {comparisons.map((row, i) => (
              <div
                key={row.metric}
                className={`grid grid-cols-3 border-t border-outline-variant/10 ${
                  i % 2 === 0 ? "bg-surface" : "bg-surface-container-low"
                }`}
              >
                <div className="px-6 py-4 font-mono text-xs text-zinc-400">
                  {row.metric}
                </div>
                <div className="px-6 py-4 font-mono text-xs text-secondary">
                  {row.libravdb}
                </div>
                <div className="px-6 py-4 font-mono text-xs text-zinc-600">
                  {row.cloudBased}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <div className="mt-12 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
          All benchmarks measured with <Version /> // Results vary by hardware
        </div>
      </div>
    </section>
  );
}
