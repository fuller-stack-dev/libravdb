"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/faq", label: "FAQ" },
  { href: "/benchmarks", label: "Benchmarks" },
  { href: "/docs", label: "Docs" },
];

export function Navbar() {
  const pathname = usePathname();
  const [stars, setStars] = useState<number | null>(null);
  const [watchers, setWatchers] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/xdarkicex/openclaw-memory-libravdb")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data) {
          setStars(data.stargazers_count);
          setWatchers(data.subscribers_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0e0e0e]/90 backdrop-blur-2xl flex justify-between items-center px-10 h-20 max-w-[1920px] mx-auto left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo-nav.png"
            alt="LIBRA VDB"
            width={32}
            height={32}
            className="h-8 w-auto [filter:invert(15%)_sepia(95%)_saturate(6932%)_hue-rotate(264deg)_brightness(89%)_contrast(106%)]"
          />
          <span className="font-headline font-black text-white tracking-tighter text-lg uppercase">
            LibraVDB
          </span>
        </Link>
        <div className="hidden md:flex gap-8 ml-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "text-[#4F00D0] font-bold border-b-2 border-[#4F00D0] pb-1 uppercase font-mono text-[11px]"
                    : "text-zinc-500 font-mono text-[11px] hover:text-zinc-200 transition-colors uppercase"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/xdarkicex/openclaw-memory-libravdb"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs uppercase text-[#4F00D0] px-4 py-2 hover:bg-[#4F00D0]/10 transition-all duration-300 flex items-center gap-4"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">star</span>
            {stars !== null ? stars.toLocaleString() : "—"}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">visibility</span>
            {watchers !== null ? watchers.toLocaleString() : "—"}
          </span>
        </a>
      </div>
    </nav>
  );
}
