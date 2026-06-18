"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems, site, socials } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  /* scroll position + reading progress */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setProgress(Math.min(100, Math.max(0, (y / max) * 100)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* active section indicator */
  useEffect(() => {
    if (!isHome) {
      setActive("");
      return;
    }
    const ids = navItems.map((item) => item.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  /* mobile menu: scroll lock, escape, focus */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className="h-[2px] origin-left bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%`, opacity: progress > 1 ? 0.85 : 0 }}
      />
      <div className="wrap">
        <div
          className={cn(
            "mt-3 flex items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-500 md:px-4",
            scrolled
              ? "glass border border-line shadow-[0_18px_50px_-30px_rgba(0,0,0,0.8)]"
              : "border border-transparent",
          )}
        >
          <a
            href={isHome ? "#top" : "/"}
            className="group flex items-center gap-2.5 rounded-full py-1 pr-2 pl-1"
            aria-label={`${site.name} — back to top`}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-card font-display text-[0.95rem] text-fg transition-colors group-hover:border-accent/60">
              {site.monogram}
              <span
                aria-hidden
                className="absolute -right-0.5 -bottom-0.5 h-1.5 w-1.5 rounded-full bg-mint"
              />
            </span>
            <span className="hidden text-[0.82rem] font-medium tracking-[-0.01em] sm:block">
              {site.name}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={hrefFor(item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.82rem] transition-colors",
                        isActive
                          ? "text-fg"
                          : "text-muted hover:text-fg",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "h-1 w-1 rounded-full transition-all duration-300",
                          isActive
                            ? "bg-accent opacity-100"
                            : "bg-transparent opacity-0",
                        )}
                      />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle size="sm" />
            <a
              href={isHome ? "#contact" : "/#contact"}
              className="btn btn-primary hidden h-9 !px-4 !py-0 text-[0.8rem] sm:inline-flex"
            >
              Let&apos;s talk
              <Icon name="arrow-up-right" size={14} />
            </a>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-bg/95 backdrop-blur-xl transition-all duration-[400ms] lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="wrap flex flex-1 flex-col justify-center pt-24 pb-10">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={hrefFor(item.id)}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 border-b border-line py-4 transition-colors hover:text-accent"
                style={{
                  transitionDelay: open ? `${index * 40}ms` : "0ms",
                }}
              >
                <span className="eyebrow text-faint">{item.index}</span>
                <span className="font-display text-[2rem] leading-none">
                  {item.label}
                </span>
                <Icon
                  name="arrow-up-right"
                  size={16}
                  className="ml-auto text-faint transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            ))}
          </nav>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  tabIndex={open ? 0 : -1}
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-fg"
                >
                  <Icon name={social.icon} size={17} />
                </a>
              ))}
            </div>
            <p className="eyebrow text-faint">{site.location}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
