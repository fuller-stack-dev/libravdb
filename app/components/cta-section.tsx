export function CtaSection() {
  return (
    <section className="py-40 px-10 relative overflow-hidden bg-surface">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="font-mono text-sm text-secondary mb-8 uppercase tracking-[0.5em]">
          TWO COMMANDS. ZERO CLOUD.
        </div>
        <h2 className="font-headline text-6xl md:text-8xl font-black uppercase text-white mb-12 tracking-tighter leading-none">
          Give Your AI <span className="text-primary">Memory</span>
        </h2>
        <div className="p-1 md:p-2 bg-gradient-to-r from-primary to-primary-dim inline-block">
          <button className="bg-black text-white px-16 py-6 font-mono font-black text-lg tracking-widest hover:bg-transparent hover:text-black transition-all group">
            <span className="group-hover:translate-x-2 transition-transform inline-block">
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
