"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/faq", label: "FAQ" },
  { href: "/benchmarks", label: "Benchmarks" },
  { href: "/docs", label: "Docs" },
];

export function Navbar() {
  const pathname = usePathname();

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
        <button className="font-mono text-xs uppercase text-[#4F00D0] px-4 py-2 hover:bg-[#4F00D0]/10 transition-all duration-300 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">terminal</span>
          OPEN TERMINAL
        </button>
      </div>
    </nav>
  );
}
