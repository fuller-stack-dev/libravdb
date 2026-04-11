const integrations = [
  "OPENCLAW",
  "NOMIC_EMBED",
  "ONNX_RUNTIME",
  "HOMEBREW",
  "GO_SIDECAR",
];

export function Integrations() {
  return (
    <section className="py-20 px-10 bg-surface-container-lowest border-y border-outline-variant/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500">
          Powered_By
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {integrations.map((name) => (
            <span
              key={name}
              className="font-headline text-2xl font-bold tracking-tighter text-white"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
