const faqs = [
  {
    question: "What is LibraVDB?",
    answer:
      "LibraVDB is a local-first memory engine for the OpenClaw AI assistant. It gives your AI persistent, scoped memory across sessions — without cloud dependencies. A Go sidecar handles embedding and storage while a TypeScript plugin integrates directly with OpenClaw.",
  },
  {
    question: "How does three-tier memory scoping work?",
    answer:
      "Every memory is stored in one of three scopes: Session (ephemeral, cleared when the conversation ends), User (persists across sessions for a single user), and Global (shared across all users and sessions). This prevents short-term context from polluting long-term recall.",
  },
  {
    question: "Does LibraVDB send data to the cloud?",
    answer:
      "No. All embedding, summarization, and retrieval happen locally on your machine. The Go sidecar runs ONNX models (Nomic Embed) for embeddings — nothing leaves your box.",
  },
  {
    question: "What embedding model does it use?",
    answer:
      "LibraVDB uses Nomic Embed via ONNX Runtime, running entirely on-device. Embedding latency is approximately 16ms per operation.",
  },
  {
    question: "How do I install it?",
    answer:
      'Two commands: "brew install openclaw/tap/libravdbd" for the Go sidecar, then "openclaw plugins install @xdarkicex/openclaw-memory-libravdb" for the TypeScript plugin. No account or API key required.',
  },
  {
    question: "What is the Go sidecar?",
    answer:
      "The sidecar (libravdbd) is a lightweight Go binary that handles vector storage, ONNX embedding inference, and the retrieval/ranking pipeline. It runs as a background daemon and communicates with the OpenClaw plugin over a local socket.",
  },
  {
    question: "How does retrieval ranking work?",
    answer:
      "Retrieval combines semantic similarity (cosine distance), recency decay, scope preference weighting, and summary quality scoring. It's not just nearest-neighbor — it's a multi-signal ranking pipeline.",
  },
  {
    question: "What is geometry-grounded compaction?",
    answer:
      "When memories accumulate, LibraVDB compacts them by summarizing clusters. Summaries are validated against their source embeddings — if a summary drifts too far in embedding space, it's rejected and regenerated. This prevents hallucinated summaries.",
  },
  {
    question: "Does it work with other AI assistants?",
    answer:
      "Currently LibraVDB is built specifically for OpenClaw. The plugin architecture is OpenClaw-native, though the Go sidecar's API could theoretically be integrated with other tools.",
  },
  {
    question: "Is it open source?",
    answer:
      "Yes. Both the TypeScript plugin and the Go sidecar are open source. No account, license key, or cloud subscription required.",
  },
];

export default function FaqPage() {
  return (
    <section className="py-32 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-xs text-secondary mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-secondary animate-pulse" />
          KNOWLEDGE_BASE
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-6">
          Frequently Asked <span className="text-primary-dim">Questions</span>
        </h1>
        <p className="text-zinc-500 font-mono text-sm mb-20 max-w-2xl">
          Everything you need to know about LibraVDB — the memory layer for
          OpenClaw.
        </p>

        <div className="space-y-0 border border-outline-variant/20">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group border-b border-outline-variant/20 last:border-b-0"
            >
              <summary className="flex items-center justify-between gap-4 px-8 py-6 cursor-pointer hover:bg-surface-container-high transition-colors">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-xs text-primary-dim tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-headline text-lg font-bold text-white uppercase tracking-tight">
                    {faq.question}
                  </span>
                </div>
                <span className="material-symbols-outlined text-zinc-500 group-open:rotate-180 transition-transform duration-200 shrink-0">
                  expand_more
                </span>
              </summary>
              <div className="px-8 pb-8 pl-20">
                <p className="text-zinc-400 font-mono text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
