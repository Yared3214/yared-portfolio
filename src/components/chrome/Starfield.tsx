"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Star = {
  x: number;
  y: number;
  r: number;
  base: number;
  phase: number;
  speed: number;
  drift: number;
  tint: "white" | "accent" | "mint";
};

type StarfieldProps = {
  className?: string;
  /** Lower = fewer stars. Stars are also capped for performance. */
  density?: number;
};

/**
 * Ambient canvas starfield: slow drift + twinkle, paused when off-screen or
 * the tab is hidden, static for users who prefer reduced motion.
 * Listens for a global "constellation" event to draw a hidden constellation.
 */
export function Starfield({ className, density = 11000 }: StarfieldProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let frame = 0;
    let visible = true;
    let constellationAt = -1;
    let accent = "#a78dff";
    let mint = "#7ee4d4";

    const readTokens = () => {
      const styles = getComputedStyle(document.documentElement);
      accent = styles.getPropertyValue("--accent").trim() || accent;
      mint = styles.getPropertyValue("--mint").trim() || mint;
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        170,
        Math.max(36, Math.round((width * height) / density)),
      );

      stars = Array.from({ length: count }, () => {
        const roll = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.25 + 0.35,
          base: Math.random() * 0.42 + 0.12,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.5 + 0.18,
          drift: Math.random() * 0.05 + 0.008,
          tint: roll > 0.94 ? "accent" : roll > 0.88 ? "mint" : "white",
        };
      });
    };

    const colorFor = (star: Star, alpha: number) => {
      const tint =
        star.tint === "accent"
          ? accent
          : star.tint === "mint"
            ? mint
            : "255, 255, 255";
      if (star.tint === "white") {
        return `rgba(255, 255, 255, ${alpha})`;
      }
      return `color-mix(in oklab, ${tint} ${
        Math.round(alpha * 100)
      }%, transparent)`;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = time / 1000;

      for (const star of stars) {
        const twinkle = reduceMotion
          ? star.base
          : star.base + Math.sin(t * star.speed + star.phase) * 0.22;
        const alpha = Math.max(0.04, Math.min(0.92, twinkle));
        const y = reduceMotion
          ? star.y
          : (star.y + t * star.drift * 30) % (height + 6);
        ctx.beginPath();
        ctx.fillStyle = colorFor(star, alpha);
        ctx.arc(star.x, y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (constellationAt > 0 && !reduceMotion) {
        const elapsed = time - constellationAt;
        const life = 7200;
        if (elapsed < life) {
          const fade =
            elapsed < 700
              ? elapsed / 700
              : elapsed > life - 1400
                ? (life - elapsed) / 1400
                : 1;
          const points = stars.slice(0, 7);
          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, fade));
          ctx.lineWidth = 1;
          ctx.strokeStyle = accent;
          ctx.shadowColor = accent;
          ctx.shadowBlur = 12;
          ctx.beginPath();
          points.forEach((star, index) => {
            const y = (star.y + elapsed * star.drift * 0.06) % height;
            if (index === 0) ctx.moveTo(star.x, y);
            else ctx.lineTo(star.x, y);
          });
          ctx.stroke();
          points.forEach((star) => {
            const y = (star.y + elapsed * star.drift * 0.06) % height;
            ctx.beginPath();
            ctx.fillStyle = accent;
            ctx.arc(star.x, y, 2.4, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.restore();
        } else {
          constellationAt = -1;
        }
      }
    };

    const loop = (time: number) => {
      if (!visible || document.hidden) {
        frame = requestAnimationFrame(loop);
        return;
      }
      if (!reduceMotion) draw(time);
      frame = requestAnimationFrame(loop);
    };

    const onConstellation = () => {
      constellationAt = performance.now();
      if (reduceMotion) {
        draw(performance.now());
      }
    };

    readTokens();
    build();
    draw(performance.now());
    frame = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      build();
      draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible && (reduceMotion || document.hidden)) draw(performance.now());
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("constellation", onConstellation);
    window.addEventListener("yb-theme-change", readTokens);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("constellation", onConstellation);
      window.removeEventListener("yb-theme-change", readTokens);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none h-full w-full", className)}
    />
  );
}
