"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

const GRID_SIZE = 40;
const EFFECT_RADIUS = 200;
const BULGE_STRENGTH = 35;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const smoothMouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

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
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
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
      className="relative min-h-[921px] flex flex-col items-center justify-center px-6 bg-surface"
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
          <span className="text-primary-dim">Not</span> just another <span className="text-primary-dim">memory plugin</span>
        </h1>

        <div className="max-w-2xl mx-auto bg-surface-container-lowest border border-outline-variant/30 p-4 font-mono text-left mb-10 scanlines">
          <div className="flex gap-2 mb-2">
            <div className="w-2 h-2 bg-error" />
            <div className="w-2 h-2 bg-secondary" />
            <div className="w-2 h-2 bg-primary" />
          </div>
          <div className="text-xs text-secondary-dim/70 mb-1">
            LIBRAVDB_MEMORY_v1.4.3 — SIDECAR CONNECTED
          </div>
          <div className="text-sm">
            <span className="text-secondary-dim">$</span>{" "}
            <span className="text-on-surface">
              brew install openclaw/tap/libravdbd
            </span>
            <br />
            <span className="text-secondary-dim">$</span>{" "}
            <span className="text-on-surface">
              openclaw plugins install @xdarkicex/openclaw-memory-libravdb
            </span>
            <br />
            <span className="text-primary-dim">[ONLINE]</span>{" "}
            <span className="text-on-surface">
              Memory sidecar ready. 3-tier scopes active.
            </span>
            <br />
            <span className="text-secondary-dim">$</span>{" "}
            <span className="animate-pulse">_</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <button className="bg-primary text-on-primary px-10 py-4 font-mono font-bold text-sm tracking-widest hover:shadow-[0_0_20px_rgba(182,160,255,0.4)] transition-all">
            INSTALL LIBRAVDB
          </button>
          <button className="border border-outline text-on-surface px-10 py-4 font-mono text-sm tracking-widest hover:bg-surface-variant transition-all">
            READ THE DOCS
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
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
