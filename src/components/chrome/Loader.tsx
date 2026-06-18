"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Short, one-per-session opening animation. It never waits on network
 * requests, so it cannot delay or block the page.
 */
export function Loader() {
  const [state, setState] = useState<"idle" | "hiding" | "gone">("idle");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("yb-intro") === "1";
    } catch {
      seen = false;
    }
    if (seen) {
      setState("gone");
      return;
    }

    try {
      sessionStorage.setItem("yb-intro", "1");
    } catch {
      /* ignore */
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 120 : 620;
    const hideTimer = window.setTimeout(() => setState("hiding"), hold);
    const goneTimer = window.setTimeout(() => setState("gone"), hold + 520);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(goneTimer);
    };
  }, []);

  if (state === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-bg transition-opacity duration-500",
        state === "hiding" ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="flex flex-col items-center gap-5">
        <span className="font-display text-5xl text-fg">{site.monogram}</span>
        <span className="relative block h-px w-32 overflow-hidden bg-line">
          <span
            className="absolute inset-y-0 left-0 w-full origin-left bg-accent"
            style={{ animation: "loader-bar 0.7s cubic-bezier(0.22,1,0.36,1) both" }}
          />
        </span>
        <span className="eyebrow text-faint">{site.title}</span>
      </div>
      <style>{`
        @keyframes loader-bar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
