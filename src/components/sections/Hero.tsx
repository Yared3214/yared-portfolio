"use client";

import { useEffect, useState } from "react";
import { site, socials } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Starfield } from "@/components/chrome/Starfield";
import { ThemeToggle } from "@/components/chrome/ThemeToggle";

const marqueeItems = [
  "Mobile engineering",
  "React Native",
  "Next.js",
  "TypeScript",
  "Supabase",
  "Offline-first",
  "Full-stack product work",
];

function PortraitCard() {
  return (
    <div className="relative mx-auto w-full max-w-[24rem]">
      {/* orbital decoration */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-full border border-dashed border-line opacity-70 md:-inset-10"
      />
      <div
        aria-hidden
        className="animate-orbit absolute -inset-8 rounded-full md:-inset-10"
      >
        <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_18px_4px_var(--glow-a)]" />
      </div>

      <div className="relative overflow-hidden rounded-[1.9rem] border border-line-strong bg-elev shadow-[0_40px_120px_-50px_rgba(0,0,0,0.95)]">
        <div className="relative aspect-[4/5]">
          {site.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={site.avatar}
              alt={`Portrait of ${site.name}`}
              width={640}
              height={800}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="relative h-full w-full">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(90% 80% at 20% 10%, rgba(124,86,255,0.42), transparent 60%), radial-gradient(80% 70% at 85% 80%, rgba(38,190,200,0.3), transparent 60%), linear-gradient(160deg, #0d0b1a 0%, #07070d 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.16]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "64px 64px",
                  maskImage:
                    "radial-gradient(70% 70% at 50% 45%, black, transparent 85%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/15">
                  <div className="absolute inset-4 rounded-full border border-white/10" />
                  <span className="font-display text-7xl tracking-tight text-white/90">
                    {site.monogram}
                  </span>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          )}

          <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.82rem] font-medium text-white">
                  {site.name}
                </p>
                <p className="font-mono text-[0.62rem] tracking-[0.16em] text-white/55 uppercase">
                  {site.title}
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 font-mono text-[0.6rem] tracking-wider text-white/70 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                EAT
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="animate-float-slow absolute -top-3 -left-4 hidden rounded-full border border-line bg-bg/80 px-3 py-1.5 font-mono text-[0.63rem] tracking-wide text-muted backdrop-blur sm:flex sm:items-center sm:gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        React Native
      </div>
      <div
        className="animate-float-slow absolute -right-3 top-1/3 hidden rounded-full border border-line bg-bg/80 px-3 py-1.5 font-mono text-[0.63rem] tracking-wide text-muted backdrop-blur sm:flex sm:items-center sm:gap-1.5"
        style={{ animationDelay: "1.4s" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-mint" />
        Next.js
      </div>
      <div
        className="animate-float-slow absolute -bottom-4 left-6 hidden rounded-full border border-line bg-bg/80 px-3 py-1.5 font-mono text-[0.63rem] tracking-wide text-muted backdrop-blur md:flex md:items-center md:gap-1.5"
        style={{ animationDelay: "0.7s" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-peach" />
        TypeScript
      </div>
    </div>
  );
}

export function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: site.timezone,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20000);
    return () => window.clearInterval(id);
  }, []);

  const enter = (delay: number) => ({
    animation: "fade-up-soft 0.95s cubic-bezier(0.22,1,0.36,1) both",
    animationDelay: `${delay}ms`,
  });

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-0 md:pt-40"
    >
      <div aria-hidden className="aurora -z-10" />
      <div className="absolute inset-0 -z-10">
        <Starfield />
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
      />

      <div className="wrap">
        <div className="grid items-center gap-14 pb-16 md:pb-20 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
          <div>
            <div
              className="flex flex-wrap items-center gap-3"
              style={enter(40)}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/[0.07] px-3 py-1.5">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-mint"
                  style={{ animation: "pulse-ring 2.6s ease-out infinite" }}
                />
                <span className="font-mono text-[0.63rem] tracking-[0.14em] text-mint uppercase">
                  {site.availability}
                </span>
              </span>
              <span className="eyebrow hidden sm:inline">
                Portfolio / {new Date().getFullYear()}
              </span>
            </div>

            <h1 className="mt-7 text-[clamp(3.2rem,8.6vw,7rem)] leading-[0.88] font-medium tracking-[-0.045em]">
              <span className="block" style={enter(120)}>
                {site.firstName}
              </span>
              <span
                className="mt-1 block font-display text-gradient italic tracking-[-0.02em]"
                style={enter(220)}
              >
                {site.lastName}
              </span>
            </h1>

            <div
              className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.82rem] text-muted"
              style={enter(320)}
            >
              <span className="inline-flex items-center gap-2 text-fg">
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-accent"
                />
                {site.title}
              </span>
              <span aria-hidden className="h-3 w-px bg-line-strong" />
              <span className="inline-flex items-center gap-1.5">
                <Icon name="map-pin" size={13} />
                {site.location}
              </span>
              <span aria-hidden className="h-3 w-px bg-line-strong" />
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] tracking-wide">
                <Icon name="clock" size={13} />
                {time ? `${time} local` : "—"}
              </span>
            </div>

            <p
              className="mt-7 max-w-xl text-[0.95rem] leading-[1.75] text-muted md:text-[1.02rem]"
              style={enter(400)}
            >
              {site.intro}
            </p>

            <div
              className="mt-9 flex flex-wrap items-center gap-3"
              style={enter(480)}
            >
              <a href="#work" className="btn btn-primary group">
                Explore my work
                <Icon
                  name="arrow-right"
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href={site.resume}
                download
                className="btn btn-ghost group"
              >
                <Icon
                  name="download"
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
                Download résumé
              </a>

              <div className="ml-1 flex items-center gap-1.5">
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
                    aria-label={`${social.label} — ${social.handle}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg"
                  >
                    <Icon name={social.icon} size={16} />
                  </a>
                ))}
              </div>
            </div>

            <p
              className="mt-6 font-mono text-[0.68rem] tracking-[0.06em] text-faint"
              style={enter(540)}
            >
              {site.availabilityNote}
            </p>
          </div>

          <div style={enter(360)} className="relative">
            <PortraitCard />
          </div>
        </div>

        <div
          className="flex items-center justify-between gap-6 border-t border-line py-6"
          style={enter(620)}
        >
          <a
            href="#about"
            className="group inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.18em] text-faint uppercase transition-colors hover:text-fg"
          >
            <span className="relative flex h-7 w-4 justify-center overflow-hidden rounded-full border border-line-strong">
              <span className="mt-1 h-1.5 w-1 rounded-full bg-accent transition-transform duration-[1400ms] group-hover:translate-y-3" />
            </span>
            Scroll to explore
          </a>
          <div className="flex items-center gap-2">
            <span className="eyebrow hidden text-faint sm:inline">
              Theme
            </span>
            <ThemeToggle size="sm" />
          </div>
        </div>
      </div>

      {/* marquee */}
      <div className="marquee relative overflow-hidden border-y border-line bg-bg-soft/60 py-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent"
        />
        <div className="marquee-track flex w-max items-center gap-10">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-center gap-10"
            >
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-10 font-mono text-[0.68rem] tracking-[0.2em] text-faint uppercase"
                >
                  {item}
                  <span className="text-accent/70">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
