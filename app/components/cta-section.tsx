export function CtaSection() {
  return (
    <section className="py-40 px-10 relative overflow-hidden bg-surface">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="font-mono text-sm text-secondary mb-8 uppercase tracking-[0.5em]">
          TWO COMMANDS. ZERO CLOUD.
        </div>
        <h2 className="font-headline text-6xl md:text-8xl font-black uppercase text-white mb-12 tracking-tighter leading-none">
          Giving Your AI Something To Remember.{" "}
          <span
            className="purple-chrome"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #6a3de8 0%, #8b6aff 8%, #f0e6ff 14%, #ffffff 17%, #d8c4ff 22%, #7e51ff 30%, #5a1fff 40%, #7e51ff 48%, #c9b3ff 55%, #ffffff 58%, #e8dcff 62%, #9c7eff 70%, #5a1fff 80%, #8b6aff 90%, #6a3de8 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Forever.
          </span>
        </h2>
        <div
          className="p-1 md:p-2 inline-block"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #6a3de8 0%, #8b6aff 8%, #f0e6ff 14%, #ffffff 17%, #d8c4ff 22%, #7e51ff 30%, #5a1fff 40%, #7e51ff 48%, #c9b3ff 55%, #ffffff 58%, #e8dcff 62%, #9c7eff 70%, #5a1fff 80%, #8b6aff 90%, #6a3de8 100%)",
            backgroundSize: "200% 100%",
            animation: "chrome-flow 12s linear infinite",
          }}
        >
          <button className="bg-black text-white px-16 py-6 font-mono font-black text-lg tracking-widest transition-all duration-500 hover:shadow-[inset_0_0_40px_rgba(126,81,255,0.15),0_0_40px_rgba(126,81,255,0.2)] hover:text-primary active:scale-[0.98] group">
            <span className="transition-all duration-500 inline-block">
              INSTALL LIBRAVDB &gt;
            </span>
          </button>
        </div>
        <div className="mt-12 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          Open source // Local-first // No account required
        </div>
      </div>
    </section>
  );
}
