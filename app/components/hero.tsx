"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useVersion } from "../hooks/use-version";

const GRID_SIZE = 40;
const EFFECT_RADIUS = 200;
const BULGE_STRENGTH = 35;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const smoothMouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const [copied, setCopied] = useState(false);
  const version = useVersion();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Lerp smooth mouse toward actual mouse
    const lerpFactor = mouseRef.current.active ? 0.15 : 0.08;
    const targetX = mouseRef.current.active ? mouseRef.current.x : smoothMouse.current.x;
    const targetY = mouseRef.current.active ? mouseRef.current.y : smoothMouse.current.y;
    smoothMouse.current.x += (targetX - smoothMouse.current.x) * lerpFactor;
    smoothMouse.current.y += (targetY - smoothMouse.current.y) * lerpFactor;

    const mx = smoothMouse.current.x;
    const my = smoothMouse.current.y;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const gridColor = "rgba(79, 0, 208, 0.05)";
    const hotColor = "rgba(182, 160, 255, 0.15)";

    // Displace a point based on distance from mouse
    const displace = (px: number, py: number): [number, number, number] => {
      const dx = px - mx;
      const dy = py - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > EFFECT_RADIUS || !mouseRef.current.active) return [px, py, 0];
      const factor = 1 - dist / EFFECT_RADIUS;
      const ease = factor * factor; // quadratic ease
      const push = ease * BULGE_STRENGTH;
      // Push points outward from center (barrel distortion)
      const angle = Math.atan2(dy, dx);
      return [px + Math.cos(angle) * push, py + Math.sin(angle) * push, ease];
    };

    ctx.lineWidth = 1;

    // Draw horizontal lines
    const cols = Math.ceil(w / GRID_SIZE) + 2;
    const rows = Math.ceil(h / GRID_SIZE) + 2;

    for (let row = -1; row <= rows; row++) {
      ctx.beginPath();
      let prevIntensity = 0;
      for (let col = -1; col <= cols; col++) {
        const baseX = col * GRID_SIZE;
        const baseY = row * GRID_SIZE;
        const [dx, dy, intensity] = displace(baseX, baseY);

        if (col === -1) {
          ctx.moveTo(dx, dy);
        } else {
          ctx.lineTo(dx, dy);
        }
        prevIntensity = Math.max(prevIntensity, intensity);
      }
      // Blend color based on max intensity along this line
      if (prevIntensity > 0.01) {
        ctx.strokeStyle = hotColor;
        ctx.globalAlpha = 0.05 + prevIntensity * 0.8;
      } else {
        ctx.strokeStyle = gridColor;
        ctx.globalAlpha = 1;
      }
      ctx.stroke();
    }

    // Draw vertical lines
    for (let col = -1; col <= cols; col++) {
      ctx.beginPath();
      let prevIntensity = 0;
      for (let row = -1; row <= rows; row++) {
        const baseX = col * GRID_SIZE;
        const baseY = row * GRID_SIZE;
        const [dx, dy, intensity] = displace(baseX, baseY);

        if (row === -1) {
          ctx.moveTo(dx, dy);
        } else {
          ctx.lineTo(dx, dy);
        }
        prevIntensity = Math.max(prevIntensity, intensity);
      }
      if (prevIntensity > 0.01) {
        ctx.strokeStyle = hotColor;
        ctx.globalAlpha = 0.05 + prevIntensity * 0.8;
      } else {
        ctx.strokeStyle = gridColor;
        ctx.globalAlpha = 1;
      }
      ctx.stroke();
    }

    ctx.globalAlpha = 1;

    // Center glow at bulge peak
    if (mouseRef.current.active) {
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, EFFECT_RADIUS);
      grad.addColorStop(0, "rgba(182, 160, 255, 0.06)");
      grad.addColorStop(0.5, "rgba(126, 81, 255, 0.02)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(mx - EFFECT_RADIUS, my - EFFECT_RADIUS, EFFECT_RADIUS * 2, EFFECT_RADIUS * 2);
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(section);

    resize();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.active = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 pt-0 pb-24 bg-surface"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[1]"
      />
      <div className="absolute inset-0 kinetic-flare pointer-events-none" />

      <div className="relative z-10 text-center max-w-5xl">
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo-nav.png"
            alt="Libra VDB Logo"
            width={400}
            height={400}
            className="w-40 h-40 object-contain drop-shadow-[0_0_15px_#4F00D0] [filter:invert(15%)_sepia(95%)_saturate(6932%)_hue-rotate(264deg)_brightness(89%)_contrast(106%)]"
          />
        </div>

        <h1 className="font-headline text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white uppercase leading-none">
          <span className="text-primary-dim">Not just </span>another{" "}
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
            memory plugin
          </span>
        </h1>

        <div className="max-w-2xl mx-auto bg-surface-container-lowest border border-outline-variant/30 p-4 font-mono text-left mb-10 scanlines relative group">
          <div className="flex gap-2 mb-2">
            <div className="w-2 h-2 bg-error" />
            <div className="w-2 h-2 bg-secondary" />
            <div className="w-2 h-2 bg-primary" />
          </div>
          <div className="text-xs text-secondary-dim/70 mb-1">
            LIBRAVDB_MEMORY_{version} — ONE-LINE BOOTSTRAP
          </div>
          <div className="text-sm flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <span className="text-secondary-dim">$</span>{" "}
              <span className="text-on-surface break-all">
                curl -fsSL https://raw.githubusercontent.com/xDarkicex/openclaw-memory-libravdb/main/install.sh | bash
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  "curl -fsSL https://raw.githubusercontent.com/xDarkicex/openclaw-memory-libravdb/main/install.sh | bash"
                );
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="shrink-0 p-1.5 text-zinc-500 hover:text-white transition-colors"
              aria-label="Copy install command"
            >
              <span className="material-symbols-outlined text-base">
                {copied ? "check" : "content_copy"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <a href="https://github.com/xdarkicex/openclaw-memory-libravdb" target="_blank" rel="noopener noreferrer" className="bg-primary text-on-primary px-10 py-4 font-mono font-bold text-sm tracking-widest hover:shadow-[0_0_20px_rgba(182,160,255,0.4)] transition-all flex items-center gap-3">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            GITHUB
          </a>
          <a href="/docs" className="border border-outline text-on-surface px-10 py-4 font-mono text-sm tracking-widest hover:bg-surface-variant transition-all">
            READ THE DOCS
          </a>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll_To_Explore
        </span>
        <span className="material-symbols-outlined animate-bounce">
          expand_more
        </span>
      </div>
    </section>
  );
}
