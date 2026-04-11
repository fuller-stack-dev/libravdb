"use client";

import { useEffect, useRef } from "react";

const STAGES = ["INGEST", "RANK", "COMPACT", "RECALL"] as const;
const SCOPES = ["SESSION", "USER", "GLOBAL"] as const;
const SCOPE_COLORS = ["#00fc40", "#b6a0ff", "#7e51ff"];

interface Particle {
  x: number;
  y: number;
  stage: number; // 0-3
  progress: number; // 0-1 within stage transition
  scope: number; // 0-2
  speed: number;
  size: number;
  alive: boolean;
}

export function Visualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      frameRef.current++;

      // Layout: 4 stage nodes arranged in a flow
      const padX = 60;
      const padY = 60;
      const stagePositions = [
        { x: padX, y: padY }, // INGEST - top left
        { x: w - padX, y: padY + 40 }, // RANK - top right
        { x: w - padX - 20, y: h - padY - 20 }, // COMPACT - bottom right
        { x: padX + 20, y: h - padY }, // RECALL - bottom left
      ];

      // Draw scope rings in the center
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.28;

      for (let i = SCOPES.length - 1; i >= 0; i--) {
        const r = maxR * ((i + 1) / SCOPES.length);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = SCOPE_COLORS[i];
        ctx.globalAlpha = 0.08 + i * 0.03;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Scope label
        ctx.globalAlpha = 0.3;
        ctx.font = "9px monospace";
        ctx.fillStyle = SCOPE_COLORS[i];
        ctx.textAlign = "center";
        ctx.fillText(SCOPES[i], cx, cy - r + 12);
      }

      ctx.globalAlpha = 1;

      // Draw flow paths between stages
      ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const from = stagePositions[i];
        const to = stagePositions[(i + 1) % 4];
        const midX = cx + (cx - (from.x + to.x) / 2) * -0.3;
        const midY = cy + (cy - (from.y + to.y) / 2) * -0.3;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(midX, midY, to.x, to.y);
        ctx.strokeStyle = "rgba(79, 0, 208, 0.15)";
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw stage nodes
      for (let i = 0; i < 4; i++) {
        const pos = stagePositions[i];
        const pulse = Math.sin(frameRef.current * 0.03 + i * 1.5) * 0.3 + 0.7;

        // Node glow
        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 30);
        grad.addColorStop(0, `rgba(126, 81, 255, ${0.15 * pulse})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(pos.x - 30, pos.y - 30, 60, 60);

        // Node square
        ctx.fillStyle = `rgba(14, 14, 14, 0.9)`;
        ctx.fillRect(pos.x - 16, pos.y - 16, 32, 32);
        ctx.strokeStyle = `rgba(182, 160, 255, ${0.4 + pulse * 0.3})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(pos.x - 16, pos.y - 16, 32, 32);

        // Node label
        ctx.fillStyle = `rgba(182, 160, 255, ${0.6 + pulse * 0.3})`;
        ctx.font = "bold 7px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(STAGES[i], pos.x, pos.y);

        // Stage number
        ctx.fillStyle = "rgba(0, 252, 64, 0.5)";
        ctx.font = "7px monospace";
        ctx.fillText(`0${i + 1}`, pos.x, pos.y - 24);
      }

      // Spawn particles
      if (frameRef.current % 12 === 0) {
        const scope = Math.floor(Math.random() * 3);
        particles.current.push({
          x: stagePositions[0].x,
          y: stagePositions[0].y,
          stage: 0,
          progress: 0,
          scope,
          speed: 0.006 + Math.random() * 0.006,
          size: 2 + Math.random() * 2,
          alive: true,
        });
      }

      // Update and draw particles
      for (const p of particles.current) {
        p.progress += p.speed;

        if (p.progress >= 1) {
          p.progress = 0;
          p.stage++;
          if (p.stage >= 4) {
            // Particle completed the cycle - on RECALL, some get compacted (shrink and fade)
            p.alive = false;
            continue;
          }
        }

        const from = stagePositions[p.stage];
        const to = stagePositions[(p.stage + 1) % 4];
        const midX = cx + (cx - (from.x + to.x) / 2) * -0.3;
        const midY = cy + (cy - (from.y + to.y) / 2) * -0.3;

        // Quadratic bezier interpolation
        const t = p.progress;
        const mt = 1 - t;
        p.x = mt * mt * from.x + 2 * mt * t * midX + t * t * to.x;
        p.y = mt * mt * from.y + 2 * mt * t * midY + t * t * to.y;

        // Compact stage: particles shrink
        const shrink = p.stage === 2 ? 1 - p.progress * 0.5 : 1;
        const particleSize = p.size * shrink;

        // Glow
        const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, particleSize * 4);
        pGrad.addColorStop(0, `${SCOPE_COLORS[p.scope]}33`);
        pGrad.addColorStop(1, "transparent");
        ctx.fillStyle = pGrad;
        ctx.fillRect(p.x - particleSize * 4, p.y - particleSize * 4, particleSize * 8, particleSize * 8);

        // Core
        ctx.beginPath();
        ctx.rect(p.x - particleSize / 2, p.y - particleSize / 2, particleSize, particleSize);
        ctx.fillStyle = SCOPE_COLORS[p.scope];
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Remove dead particles
      particles.current = particles.current.filter((p) => p.alive);

      // Status text
      ctx.fillStyle = "rgba(100, 100, 100, 0.4)";
      ctx.font = "9px monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillText(`[ACTIVE_MEMORIES: ${particles.current.length}]`, 12, h - 24);
      ctx.fillText(`[CYCLE: ${Math.floor(frameRef.current / 60)}]`, 12, h - 12);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="py-32 px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Visualization */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full" />
            <div className="relative bg-surface-container-highest p-4 hard-shadow-primary border border-primary/20 aspect-square flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ imageRendering: "auto" }}
              />
            </div>
            <div className="absolute -top-4 -right-4 bg-surface px-3 py-1 border border-secondary text-secondary font-mono text-[10px] tracking-widest uppercase">
              Pipeline_Monitor
            </div>
          </div>

          {/* Description */}
          <div className="order-1 lg:order-2">
            <div className="font-mono text-xs text-primary mb-6 uppercase tracking-widest">
              &gt; Context_Engine
            </div>
            <h2 className="font-headline text-5xl font-black uppercase text-white mb-8 leading-tight">
              Ingest. Rank. <br /> Compact. Recall.
            </h2>
            <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-10">
              LibraVDB replaces the entire context lifecycle — from ingestion
              gating through retrieval ranking to automatic compaction. Summaries
              are grounded in embedding space, not decoder confidence. Drifted
              summaries get rejected.
            </p>
            <ul className="space-y-4 font-mono text-xs uppercase text-zinc-500">
              <li className="flex items-center gap-4">
                <span className="text-primary">01</span>
                <span className="text-zinc-300">
                  Domain-Adaptive Ingestion Gate
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-primary">02</span>
                <span className="text-zinc-300">
                  Five-Tier Injection Hierarchy
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-primary">03</span>
                <span className="text-zinc-300">
                  Geometry-Grounded Compaction
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
