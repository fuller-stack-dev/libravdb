const footerLinks = [
  { label: "Security_Protocol", href: "#" },
  { label: "System_Status", href: "#" },
  { label: "Neural_Link", href: "#" },
  { label: "Terms", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-surface-container-low flex flex-col md:flex-row justify-between items-center px-10 py-12 gap-8 w-full cursor-crosshair">
      <div className="text-secondary font-mono uppercase tracking-[0.2em] text-[10px]">
        LIBRA VDB // STATUS: MEMORY_ONLINE_v1.4.3
      </div>
      <div className="flex gap-10">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            className="text-zinc-600 font-mono text-[10px] tracking-[0.2em] uppercase hover:text-white transition-colors"
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="text-zinc-700 font-mono text-[8px] uppercase">
        © 2024 LIBRA_NEURAL_NETWORK_SYNDICATE
      </div>
    </footer>
  );
}
