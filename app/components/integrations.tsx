const integrations = [
  "OPENCLAW",
  "NOMIC_EMBED",
  "ONNX_RUNTIME",
  "HOMEBREW",
  "GOLANG",
];

export function Integrations() {
  const doubled = [...integrations, ...integrations];

  return (
    <section className="py-20 px-10 bg-surface-container-lowest border-y border-outline-variant/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500 flex-shrink-0">
          Powered_By
        </div>
        <div className="relative flex-1 overflow-hidden mask-fade">
          <div className="flex items-center gap-16 animate-scroll w-max">
            {doubled.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-headline text-2xl font-bold tracking-tighter text-white opacity-50 hover:opacity-100 transition-opacity duration-500 flex-shrink-0"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
