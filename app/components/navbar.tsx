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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <>
      <nav className="fixed left-1/2 top-0 z-50 mx-auto flex h-20 w-full max-w-[1920px] -translate-x-1/2 items-center justify-between bg-[#0e0e0e]/90 px-4 backdrop-blur-2xl sm:px-6 lg:px-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="flex items-center gap-3 sm:gap-4">
            <Image
              src="/logo-nav.png"
              alt="LIBRA VDB"
              width={32}
              height={32}
              className="h-8 w-auto [filter:invert(15%)_sepia(95%)_saturate(6932%)_hue-rotate(264deg)_brightness(89%)_contrast(106%)]"
            />
            <span className="font-headline text-base font-black uppercase tracking-tighter text-white sm:text-lg">
              LibraVDB
            </span>
          </Link>
          <div className="ml-6 hidden gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? "border-b-2 border-[#4F00D0] pb-1 font-mono text-[11px] font-bold uppercase text-[#4F00D0]"
                      : "font-mono text-[11px] uppercase text-zinc-500 transition-colors hover:text-zinc-200"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://github.com/xdarkicex/openclaw-memory-libravdb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-4 py-2 font-mono text-xs uppercase text-[#4F00D0] transition-all duration-300 hover:bg-[#4F00D0]/10"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
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

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-outline bg-surface-container-low text-on-surface transition-colors hover:bg-surface-variant md:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="material-symbols-outlined text-[1.35rem]">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      <div
        className={
          isMenuOpen
            ? "fixed inset-x-0 top-20 z-40 border-t border-outline-variant bg-[#0e0e0e]/96 px-4 pb-5 pt-4 backdrop-blur-2xl md:hidden"
            : "hidden"
        }
        id="mobile-nav"
      >
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={
                  isActive
                    ? "border border-[#4F00D0] bg-[#4F00D0]/10 px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#4F00D0]"
                    : "border border-outline-variant px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-200 transition-colors hover:border-[#4F00D0]/50 hover:text-white"
                }
              >
                {link.label}
              </Link>
            );
          })}

          <a
            href="https://github.com/xdarkicex/openclaw-memory-libravdb"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-between border border-outline-variant px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-[#4F00D0] transition-colors hover:border-[#4F00D0]/50"
          >
            <span className="flex items-center gap-3">
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              GitHub
            </span>
            <span className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">star</span>
                {stars !== null ? stars.toLocaleString() : "—"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">visibility</span>
                {watchers !== null ? watchers.toLocaleString() : "—"}
              </span>
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
