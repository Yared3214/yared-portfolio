"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * Easter egg: type the secret word (default "orbit") anywhere on the site, or
 * press the small star in the footer. Draws a constellation in the hero canvas
 * and shows a short, dismissible note.
 */
export function EasterEgg() {
  const [open, setOpen] = useState(false);
  const buffer = useRef("");
  const closeTimer = useRef<number | null>(null);

  const trigger = useCallback(() => {
    window.dispatchEvent(new Event("constellation"));
    setOpen(true);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 11000);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key.length !== 1) return;
      buffer.current = (buffer.current + event.key.toLowerCase()).slice(-12);
      if (buffer.current.endsWith(site.secretWord)) {
        buffer.current = "";
        trigger();
      }
    };
    const onToggle = () => trigger();
    window.addEventListener("keydown", onKey);
    window.addEventListener("yb-easter-egg", onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("yb-easter-egg", onToggle);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, [trigger]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "no-print fixed bottom-4 left-4 z-[75] w-[min(22rem,calc(100vw-2rem))] transition-all duration-500 md:bottom-6 md:left-6",
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <div className="glass relative overflow-hidden rounded-2xl p-4 pr-10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(120% 120% at 0% 0%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-2">
            <Icon name="sparkle" size={13} className="text-accent" />
            <span className="eyebrow text-accent">Constellation found</span>
          </div>
          <p className="mt-2 text-[0.82rem] leading-relaxed text-fg">
            You found the hidden star. This site was designed and built in Addis
            Ababa, mostly between 11pm and 2am, with a lot of coffee.
          </p>
          <p className="mt-2 font-mono text-[0.68rem] tracking-wide text-faint">
            {site.secretWord} · {site.location}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss hidden note"
          className="absolute top-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-fg"
        >
          <Icon name="close" size={12} />
        </button>
      </div>
    </div>
  );
}
