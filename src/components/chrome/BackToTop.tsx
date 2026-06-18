"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setProgress(Math.min(1, Math.max(0, y / max)));
      setVisible(y > 640);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circumference = 2 * Math.PI * 20;

  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      aria-label="Back to top"
      className={cn(
        "no-print group fixed right-4 bottom-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-bg/80 text-fg backdrop-blur-md transition-all duration-500 md:right-6 md:bottom-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 44 44"
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="1.4"
        />
        <circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          className="transition-[stroke-dashoffset] duration-150"
        />
      </svg>
      <Icon
        name="arrow-up"
        size={17}
        className="relative transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
