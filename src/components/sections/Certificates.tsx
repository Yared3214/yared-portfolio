"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { certificates, type Certificate } from "@/content/certificates";
import { sectionIndex } from "@/content/site";
import { Artwork } from "@/components/ui/Artwork";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";

function CertificatePreview({
  certificate,
  compact = false,
}: {
  certificate: Certificate;
  compact?: boolean;
}) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line">
      <Artwork
        art={certificate.art}
        idSuffix={`${certificate.id}-${compact ? "sm" : "lg"}`}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-black/25" />
      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[0.56rem] tracking-[0.18em] text-white/60 uppercase">
            Study track
          </span>
          <span className="font-mono text-[0.56rem] tracking-[0.14em] text-white/60">
            {certificate.date}
          </span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <span className="font-mono text-[0.56rem] tracking-[0.16em] text-white/45 uppercase">
            Self-directed
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 text-white/70">
            <Icon name="sparkle" size={13} />
          </span>
        </div>
      </div>
    </div>
  );
}

export function Certificates() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const active = activeIndex === null ? null : certificates[activeIndex];

  const close = useCallback(() => {
    setActiveIndex(null);
    lastFocused.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab" && closeRef.current) {
        // keep focus inside the dialog
        event.preventDefault();
        closeRef.current.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close]);

  return (
    <section id="credentials" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
      />
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            index={sectionIndex.credentials}
            label="Credentials"
            title={
              <>
                Learning tracks, not{" "}
                <em className="font-display text-accent italic">badges</em>
              </>
            }
            description="No formal certificates yet. These are the structured study tracks I used to close specific gaps — click any card for the detail."
          />
          <p className="font-mono text-[0.62rem] tracking-[0.14em] text-faint uppercase">
            {certificates.length} entries
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate, index) => (
            <Reveal key={certificate.id} delay={index * 80}>
              <button
                type="button"
                onClick={(event) => {
                  lastFocused.current = event.currentTarget;
                  setActiveIndex(index);
                }}
                aria-label={`View ${certificate.name} study track`}
                className="group w-full rounded-[1.25rem] border border-line bg-card p-2.5 text-left transition-all duration-[400ms] hover:-translate-y-1 hover:border-line-strong hover:bg-card-hover"
              >
                <CertificatePreview certificate={certificate} />
                <div className="px-1.5 pt-3.5 pb-1">
                  <p className="text-[0.9rem] leading-snug font-medium">
                    {certificate.name}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <p className="text-[0.75rem] text-muted">
                      {certificate.issuer}
                    </p>
                    <span className="font-mono text-[0.6rem] tracking-[0.1em] text-faint uppercase">
                      {certificate.date}
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-title"
        >
          <button
            type="button"
            aria-label="Close certificate"
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-md"
            tabIndex={-1}
          />
          <div className="dialog-enter relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-line-strong bg-elev shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="eyebrow text-accent">Study track</span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close certificate"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-fg"
              >
                <Icon name="close" size={14} />
              </button>
            </div>

            <div className="p-4 md:p-5">
              <CertificatePreview certificate={active} compact />
              <div className="mt-5">
                <h3
                  id="certificate-title"
                  className="text-[1.25rem] font-medium tracking-[-0.02em]"
                >
                  {active.name}
                </h3>
                <p className="mt-1 text-[0.85rem] text-muted">
                  {active.issuer} · {active.date}
                </p>
                <p className="mt-3 text-[0.87rem] leading-relaxed text-muted">
                  {active.summary}
                </p>

                {active.credentialUrl ? (
                  <a
                    href={active.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("btn btn-ghost mt-5 !py-2 !text-[0.78rem]")}
                  >
                    Verify credential
                    <Icon name="external" size={13} />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
