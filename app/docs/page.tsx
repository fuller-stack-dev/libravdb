import type { Metadata } from "next";
import Link from "next/link";
import { Version } from "../components/version";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Installation, architecture, configuration, and scope reference for LibraVDB — the local-first memory engine for OpenClaw.",
  openGraph: {
    title: "LibraVDB Documentation",
    description:
      "Installation, architecture, and configuration reference for LibraVDB.",
    url: "https://libravdb.com/docs",
  },
};

const sections = [
  {
    id: "quickstart",
    title: "Quickstart",
    content: [
      {
        type: "text" as const,
        body: "Get LibraVDB running in under a minute. One command, zero cloud dependencies.",
      },
      {
        type: "code" as const,
        label: "One-line bootstrap (installs daemon, plugin, and restarts gateway)",
        code: "curl -fsSL https://raw.githubusercontent.com/xDarkicex/openclaw-memory-libravdb/main/install.sh | bash",
      },
      {
        type: "text" as const,
        body: "The sidecar starts automatically after install. Verify it's running:",
      },
      {
        type: "code" as const,
        label: "Check sidecar status",
        code: "libravdbd status",
      },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    content: [
      {
        type: "text" as const,
        body: "LibraVDB consists of two components that communicate over a local Unix socket:",
      },
      {
        type: "list" as const,
        items: [
          "TypeScript Plugin — Integrates with OpenClaw's plugin system. Handles memory lifecycle hooks (onMessage, onResponse, onSessionEnd) and injects retrieved context into prompts.",
          "Go Sidecar (libravdbd) — Manages vector storage, ONNX embedding inference (Nomic Embed), retrieval ranking, and compaction. Runs as a background daemon.",
        ],
      },
      {
        type: "text" as const,
        body: "All data stays on your machine. The sidecar stores embeddings in a local database file at ~/.libravdb/data/.",
      },
    ],
  },
  {
    id: "memory-scopes",
    title: "Memory Scopes",
    content: [
      {
        type: "text" as const,
        body: "Every memory is assigned to one of three scopes. The ingestion gate automatically determines scope based on content analysis.",
      },
      {
        type: "list" as const,
        items: [
          "Session — Ephemeral context for the current conversation. Cleared when the session ends. Best for working memory and task-specific context.",
          "User — Persists across sessions for a single user. Stores preferences, patterns, and recurring context. Survives session boundaries.",
          "Global — Shared across all users and sessions. Stores universal facts, project conventions, and system-level knowledge.",
        ],
      },
      {
        type: "text" as const,
        body: "Retrieval ranking weights scope appropriately — session memories are preferred for immediate context, while global memories serve as background knowledge.",
      },
    ],
  },
  {
    id: "retrieval",
    title: "Retrieval Pipeline",
    content: [
      {
        type: "text" as const,
        body: "LibraVDB doesn't just do nearest-neighbor search. Retrieval is a multi-signal ranking pipeline:",
      },
      {
        type: "list" as const,
        items: [
          "Semantic Similarity — Cosine distance between query embedding and stored memory embeddings.",
          "Recency Decay — Recent memories get a boost. The decay curve is configurable.",
          "Scope Preference — Session-scoped memories rank higher for in-conversation queries.",
          "Summary Quality — Compacted summaries are scored against their source embeddings. Drifted summaries are penalized.",
        ],
      },
      {
        type: "text" as const,
        body: "The final ranked list is injected into the prompt at the appropriate injection tier (system, context, reference, background, or archive).",
      },
    ],
  },
  {
    id: "compaction",
    title: "Compaction",
    content: [
      {
        type: "text" as const,
        body: "As memories accumulate, LibraVDB periodically compacts clusters into summaries. Unlike naive approaches, compaction is geometry-grounded:",
      },
      {
        type: "list" as const,
        items: [
          "Memories are clustered by embedding proximity.",
          "A summary is generated for each cluster.",
          "The summary is embedded and compared against the centroid of its source cluster.",
          "If the summary embedding drifts beyond a threshold, it's rejected and regenerated.",
          "This prevents hallucinated or unfaithful summaries from entering long-term memory.",
        ],
      },
    ],
  },
  {
    id: "configuration",
    title: "Configuration",
    content: [
      {
        type: "text" as const,
        body: "LibraVDB is configured through the OpenClaw plugin settings. Key options:",
      },
      {
        type: "code" as const,
        label: "Example configuration (~/.openclaw/plugins/memory-libravdb.json)",
        code: `{
  "sidecarPort": 7420,
  "scopes": {
    "session": { "maxMemories": 200, "ttl": "24h" },
    "user": { "maxMemories": 5000, "compactAfter": 500 },
    "global": { "maxMemories": 10000, "compactAfter": 1000 }
  },
  "retrieval": {
    "topK": 10,
    "recencyDecay": 0.95,
    "minSimilarity": 0.65
  },
  "compaction": {
    "driftThreshold": 0.15,
    "clusterMinSize": 5
  }
}`,
      },
    ],
  },
];

export default function DocsPage() {
  return (
    <section className="py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-16">
          {/* Sidebar nav */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-6">
                Navigation
              </div>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <Link
                    key={s.id}
                    href={`#${s.id}`}
                    className="block font-mono text-xs text-zinc-500 hover:text-white py-2 px-3 hover:bg-surface-container-high transition-colors uppercase tracking-wider"
                  >
                    {s.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div>
            <div className="font-mono text-xs text-secondary mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-secondary animate-pulse" />
              DOCUMENTATION
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-6">
              <span className="text-primary-dim">Docs</span>
            </h1>
            <p className="text-zinc-500 font-mono text-sm mb-20 max-w-2xl">
              Installation, architecture, and configuration reference for
              LibraVDB <Version />.
            </p>

            <div className="space-y-24">
              {sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="font-headline text-3xl font-black uppercase text-white mb-8 tracking-tight">
                    {section.title}
                  </h2>
                  <div className="space-y-6">
                    {section.content.map((block, i) => {
                      if (block.type === "text") {
                        return (
                          <p
                            key={i}
                            className="text-zinc-400 font-mono text-sm leading-relaxed"
                          >
                            {block.body}
                          </p>
                        );
                      }
                      if (block.type === "code") {
                        return (
                          <div
                            key={i}
                            className="bg-surface-container-lowest border border-outline-variant/20 p-5 scanlines"
                          >
                            {block.label && (
                              <div className="font-mono text-[10px] text-zinc-500 mb-3 uppercase tracking-wider">
                                {block.label}
                              </div>
                            )}
                            <pre className="font-mono text-sm text-on-surface overflow-x-auto">
                              <code>{block.code}</code>
                            </pre>
                          </div>
                        );
                      }
                      if (block.type === "list") {
                        return (
                          <ul key={i} className="space-y-3 pl-2">
                            {block.items.map((item, j) => (
                              <li
                                key={j}
                                className="flex gap-4 text-zinc-400 font-mono text-sm leading-relaxed"
                              >
                                <span className="text-primary-dim shrink-0 mt-0.5">
                                  —
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
