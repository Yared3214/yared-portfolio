"use client";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export const THEME_KEY = "yb-theme";

export function setTheme(theme: "dark" | "light") {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* storage may be unavailable — the theme still applies for this visit */
  }
  window.dispatchEvent(new Event("yb-theme-change"));
}

export function toggleTheme() {
  const current =
    document.documentElement.dataset.theme === "light" ? "light" : "dark";
  setTheme(current === "dark" ? "light" : "dark");
}

type ThemeToggleProps = {
  className?: string;
  size?: "sm" | "md";
};

/**
 * Both icons live in the markup and CSS decides which is visible, so the
 * button never flashes or mismatches during hydration.
 */
export function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "theme-toggle inline-flex items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg",
        size === "sm" ? "h-9 w-9" : "h-10 w-10",
        className,
      )}
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
    >
      <Icon name="moon" size={16} className="icon-moon" />
      <Icon name="sun" size={17} className="icon-sun" />
    </button>
  );
}
