import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Starfield } from "@/components/chrome/Starfield";

export const metadata = {
  title: "Lost in orbit",
  description: "This page could not be found.",
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[85svh] items-center overflow-hidden py-28">
      <div className="absolute inset-0 -z-10">
        <Starfield density={9000} />
      </div>
      <div aria-hidden className="aurora -z-10 opacity-70" />

      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">Error 404</p>
          <h1 className="mt-5 text-[clamp(3rem,10vw,7rem)] leading-[0.88] font-medium tracking-[-0.05em]">
            Lost in
            <br />
            <em className="font-display text-gradient italic">orbit</em>.
          </h1>
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted">
            This page drifted off the map. The good news: everything worth
            looking at is one link away.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/" className="btn btn-primary group">
              Back to home
              <Icon
                name="arrow-right"
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link href="/#work" className="btn btn-ghost">
              See the work
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 font-mono text-[0.63rem] tracking-[0.12em] text-faint uppercase">
            <span>Try instead</span>
            <Link href="/writing" className="transition-colors hover:text-fg">
              Writing
            </Link>
            <Link href="/#about" className="transition-colors hover:text-fg">
              About
            </Link>
            <Link href="/#contact" className="transition-colors hover:text-fg">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
