"use client";

import Link from "next/link";
import { navItems, site, socials } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

const secondaryLinks = [
  { label: "Credentials", href: "/#credentials" },
  { label: "Interests", href: "/#interests" },
  { label: "All writing", href: "/writing" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="no-print relative overflow-hidden border-t border-line bg-bg-soft/40">
      <div className="wrap py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label={`${site.name} — home`}
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-card font-display text-base">
                {site.monogram}
                <span
                  aria-hidden
                  className="absolute -right-0.5 -bottom-0.5 h-1.5 w-1.5 rounded-full bg-mint"
                />
              </span>
              <span className="text-[0.9rem] font-medium">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-[0.84rem] leading-relaxed text-muted">
              {site.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2">
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
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg"
                >
                  <Icon name={social.icon} size={14} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-faint">Navigate</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    className="underline-sweep text-[0.84rem] text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="underline-sweep text-[0.84rem] text-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-faint">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {socials.map((social) => (
                <li key={`list-${social.label}`}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group inline-flex items-center gap-1.5 text-[0.84rem] text-muted transition-colors hover:text-fg"
                  >
                    {social.handle}
                    <Icon
                      name="arrow-up-right"
                      size={11}
                      className="opacity-0 transition-opacity group-hover:opacity-60"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[15rem] font-mono text-[0.62rem] leading-relaxed text-faint">
              {site.location} · UTC+3
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.75rem] text-faint">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="font-mono text-[0.62rem] tracking-[0.06em] text-faint">
              Built with Next.js, care and a lot of coffee.
            </p>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("yb-easter-egg"))}
              aria-label="Hidden surprise"
              title="There is something here"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-line text-faint/70 transition-all duration-500 hover:rotate-45 hover:border-accent/60 hover:text-accent"
            >
              <Icon name="star" size={11} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
