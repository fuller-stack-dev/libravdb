const features = [
  {
    icon: "stacks",
    metric: "Metric_01",
    title: "Three-Tier Scoping",
    description:
      "Session, user, and global memory stay structurally separate. Long sessions never pollute long-term recall.",
    status: "Scoped",
    borderClasses: "border-r border-outline-variant/20 border-b md:border-b-0",
  },
  {
    icon: "neurology",
    metric: "Metric_02",
    title: "Hybrid Retrieval",
    description:
      "Ranked by semantic similarity, recency decay, scope preference, and summary quality. Not just cosine distance.",
    status: "Intelligent",
    borderClasses: "border-r border-outline-variant/20 border-b md:border-b-0",
  },
  {
    icon: "home_storage",
    metric: "Metric_03",
    title: "Fully Local",
    description:
      "ONNX embeddings and summarization run on your machine. No cloud calls. Your session content never leaves the box.",
    status: "Private",
    borderClasses: "",
  },
];

export function Features() {
  return (
    <section className="py-32 px-10 bg-surface-container-low relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="font-mono text-xs text-secondary mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-secondary animate-pulse" />
              CORE_SPECIFICATIONS
            </div>
            <h2 className="font-headline text-5xl font-black uppercase tracking-tight text-white max-w-xl">
              A Complete{" "}
              <span className="text-primary-dim">Context Lifecycle</span>
            </h2>
          </div>
          <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest text-right">
            Embedding_Latency: ~16ms
            <br />
            Scopes: Session / User / Global
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-outline-variant/20">
          {features.map((feature) => (
            <div
              key={feature.metric}
              className={`p-12 bg-surface hover:bg-surface-container-high transition-all group relative overflow-hidden flex flex-col ${feature.borderClasses}`}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary-dim scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              <div className="mb-10 text-primary-dim">
                <span className="material-symbols-outlined text-4xl">
                  {feature.icon}
                </span>
              </div>
              <div className="font-mono text-[10px] text-zinc-500 mb-2 uppercase tracking-tighter">
                {feature.metric}
              </div>
              <h3 className="font-headline text-2xl font-bold text-white mb-4 uppercase min-h-[4rem]">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-mono min-h-[7rem]">
                {feature.description}
              </p>
              <div className="text-secondary text-xs font-mono uppercase tracking-widest mt-auto">
                Status: {feature.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
